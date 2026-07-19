import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';

const IMAGES = [
  'https://images.unsplash.com/photo-1506744626753-dba37c254551?w=1280&q=40',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1280&q=40',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1280&q=40',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1280&q=40',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1280&q=40'
];

function SlideshowBackground() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {IMAGES.map((img, i) => (
        <img 
          key={img} 
          src={img} 
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${i === index ? 'opacity-30 md:opacity-40' : 'opacity-0'}`} 
          alt="calm bg" 
        />
      ))}
      <div className="absolute inset-0 bg-background/70 mix-blend-overlay"></div>
    </div>
  );
}



function App() {
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [recentRoomCode, setRecentRoomCode] = useState(localStorage.getItem('imposter_recent_room') || '');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secretWord, setSecretWord] = useState('');
  const [isImposter, setIsImposter] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState('16');
  const hasRetrievedWord = useRef(false);
  const currentRoomRef = useRef(null);
  const fetchDebounceRef = useRef(null);

  useEffect(() => {
    let pid = localStorage.getItem('imposter_pid');
    let secret = localStorage.getItem('imposter_secret');
    if (!pid || !secret) {
      pid = pid || crypto.randomUUID();
      secret = secret || crypto.randomUUID();
      localStorage.setItem('imposter_pid', pid);
      localStorage.setItem('imposter_secret', secret);
    }
    setPlayerId(pid);
    console.log("Initialized Player Auth");
  }, []);

  // Keep ref in sync for stable callback access
  useEffect(() => { currentRoomRef.current = currentRoom; }, [currentRoom]);

  useEffect(() => {
    if (!currentRoom?.id) return;
    const roomId = currentRoom.id;

    const roomSub = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'imposter_rooms', filter: `id=eq.${roomId}` }, 
        (payload) => {
          console.log("Room updated:", payload.new.status);
          setCurrentRoom(payload.new);
        }
      )
      .subscribe();

    const playersSub = supabase
      .channel(`players:${roomId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'imposter_players', filter: `room_id=eq.${roomId}` }, 
        () => {
          // Debounce: collapse rapid player events into one fetch
          clearTimeout(fetchDebounceRef.current);
          fetchDebounceRef.current = setTimeout(() => fetchPlayers(roomId), 300);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomSub);
      supabase.removeChannel(playersSub);
    }
  }, [currentRoom?.id]);

  useEffect(() => {
    if (currentRoom?.status === 'playing') {
      if (hasRetrievedWord.current) return; // Already fetched this round
      const me = players.find(p => p.player_id === playerId);
      if (me) {
        // Securely fetch the word from Vercel + Redis
        fetch(`/api/get-word?roomId=${currentRoom.id}&playerRowId=${me.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              console.error("Failed to get word:", data.error);
            } else {
              setIsImposter(data.isImposter);
              setSecretWord(data.word);
              hasRetrievedWord.current = true;
            }
          })
          .catch(err => console.error("Error fetching word:", err));
      }
    } else {
      // Reset for next round
      hasRetrievedWord.current = false;
    }
  }, [currentRoom?.status, players, playerId]);

  const fetchPlayers = async (roomId) => {
    const { data } = await supabase.from('imposter_players').select('*').eq('room_id', roomId);
    if (data) setPlayers(data);
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({length: 4}).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const createRoom = async () => {
    if (!playerName.trim()) return alert("Enter a name");
    setLoading(true);
    
    try {
      const secretToken = localStorage.getItem('imposter_secret');
      const res = await fetch('/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerName, playerId, secretToken, isCreating: true, maxPlayers 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room");

      setIsHost(data.isHost);
      setCurrentRoom(data.room);
      localStorage.setItem('imposter_recent_room', data.room.room_code);
      setRecentRoomCode(data.room.room_code);
      await fetchPlayers(data.room.id);
      console.log("Room created securely");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const rejoinRecentRoom = async () => {
    if (!recentRoomCode) return;
    setRoomCode(recentRoomCode);
    alert("Enter your name and click Join to rejoin the room.");
  };

  const joinRoom = async (e) => {
    e?.preventDefault();
    if (!playerName.trim() || !roomCode.trim()) return alert("Enter name and code");
    setLoading(true);
    
    try {
      const secretToken = localStorage.getItem('imposter_secret');
      const res = await fetch('/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomCode, playerName, playerId, secretToken, isCreating: false 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join room");

      setIsHost(data.isHost);
      setCurrentRoom(data.room);
      localStorage.setItem('imposter_recent_room', data.room.room_code);
      setRecentRoomCode(data.room.room_code);
      await fetchPlayers(data.room.id);
      console.log("Joined room securely");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const endRound = async (action) => {
    if (!confirm(action === 'delete-room' ? "Permanently end this room?" : "End round and return to lobby?")) return;
    setLoading(true);
    try {
      const res = await fetch('/api/end-round', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: currentRoom.id, secretToken: localStorage.getItem('imposter_secret'), action })
      });
      if (!res.ok) throw new Error("Action failed");
      
      if (action === 'delete-room') {
        setCurrentRoom(null);
        localStorage.removeItem('imposter_recent_room');
        setRecentRoomCode('');
      }
    } catch(err) {
      console.error(err);
      alert(err.message);
    }
    setLoading(false);
  };

  const startGame = async () => {
    if (players.length < 3) {
      if(!confirm("Game usually needs 3+ players. Start anyway?")) return;
    }
    setLoading(true);
    console.log("Initiating protocol via Vercel Function...");
    try {
      const res = await fetch('/api/generate-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: currentRoom.id, secretToken: localStorage.getItem('imposter_secret') })
      });
      if (!res.ok) throw new Error("Failed to start game");
      const data = await res.json();
      console.log("Protocol initiated!");
      if (data.tokenUsage) {
        console.log(`[Token Usage] Input Tokens: ${data.tokenUsage.promptTokenCount} | Output Tokens: ${data.tokenUsage.candidatesTokenCount} | Total Khorcha: ${data.tokenUsage.totalTokenCount}`);
      }
    } catch(err) {
      console.error("Error:", err.message);
      alert("Error starting game: " + err.message);
    }
    setLoading(false);
  };

  if (!currentRoom) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <SlideshowBackground />
        <div className="scanlines"></div>
        <div className="jarvis-panel p-6 md:p-8 w-full max-w-md text-center space-y-6 md:space-y-8 z-10 transition-all">
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold tracking-[0.2em] text-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">WORD IMPOSTER</h1>
          
          {recentRoomCode && (
            <div className="bg-cyan/10 border border-cyan/30 p-4 rounded-md space-y-3">
              <div className="text-xs text-cyan/70 font-mono tracking-widest">RECENT ROOM FOUND</div>
              <button 
                onClick={rejoinRecentRoom} 
                disabled={loading}
                className="jarvis-button w-full !border-cyan !text-cyan hover:!bg-cyan/20"
              >
                REJOIN ROOM [{recentRoomCode}]
              </button>
            </div>
          )}
          
          <div className="space-y-4">
            <input 
              name="playerName"
              type="text" 
              placeholder="YOUR NAME" 
              className="jarvis-input w-full text-base md:text-lg"
              maxLength={15}
              value={playerName}
              onChange={e => setPlayerName(e.target.value.toUpperCase())}
            />
            
            <div className="flex gap-2">
              <button onClick={createRoom} disabled={loading} className="jarvis-button w-full text-sm md:text-base">CREATE ROOM</button>
              <select 
                value={maxPlayers}
                onChange={e => setMaxPlayers(e.target.value)}
                className="bg-background border border-cyan/30 text-cyan p-2 font-mono text-sm outline-none w-20 text-center rounded-sm focus:border-cyan"
                title="Max Players"
              >
                {[3,4,5,6,8,10,12,16,24,32,64].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            <div className="text-cyan/50 font-mono text-xs md:text-sm uppercase tracking-widest pt-2">- OR -</div>
            <form onSubmit={joinRoom} className="flex gap-2 pt-2">
              <input 
                name="roomCode"
                type="text" 
                placeholder="CODE"
                className="jarvis-input !text-left w-full text-base md:text-lg"
                maxLength={4}
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
              />
              <button type="submit" disabled={loading} className="jarvis-button px-6 text-sm md:text-base">JOIN</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 pt-12 md:pt-16">
      <SlideshowBackground />
      <div className="scanlines"></div>
      
      <div className="jarvis-panel p-4 md:p-6 w-full max-w-lg z-10 flex flex-col gap-4 md:gap-6 transition-all">
        <div className="flex justify-between items-center border-b border-cyan/30 pb-4">
          <div>
            <div className="font-mono text-cyan/60 text-[10px] md:text-xs uppercase tracking-[0.2em]">Room Code</div>
            <h2 className="font-orbitron text-2xl md:text-4xl font-bold tracking-[0.3em]">{currentRoom.room_code}</h2>
          </div>
          <div className="text-right">
            <div className="font-mono text-cyan/60 text-[10px] md:text-xs uppercase tracking-[0.2em]">Status</div>
            <div className="font-orbitron text-sm md:text-lg uppercase tracking-wider text-red drop-shadow-[0_0_8px_rgba(255,23,68,0.8)]">{currentRoom.status}</div>
          </div>
        </div>

        {currentRoom.status === 'lobby' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="font-mono uppercase tracking-[0.2em] text-cyan/80 text-sm md:text-base">Players ({players.length}/{currentRoom.max_players || 16})</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {players.map(p => (
                <div key={p.id} className="border border-cyan/20 bg-cyan/5 px-2 py-2 md:px-4 md:py-3 font-mono uppercase text-center flex items-center justify-between text-xs md:text-sm">
                  <span className="truncate">{p.name}</span>
                  {p.is_host && <span className="text-[9px] md:text-[10px] text-red ml-1 shrink-0">[HOST]</span>}
                </div>
              ))}
            </div>
            
            {isHost && (
              <div className="flex gap-2 mt-6">
                <button onClick={startGame} disabled={loading} className="jarvis-button flex-1 !border-cyan !text-cyan hover:!bg-cyan/10 text-sm md:text-base py-3">
                  INITIATE PROTOCOL
                </button>
                <button onClick={() => endRound('delete-room')} disabled={loading} className="jarvis-button flex-1 !border-red/50 !text-red/50 hover:!bg-red/10 text-sm md:text-base py-3">
                  END ROOM
                </button>
              </div>
            )}
            {!isHost && (
              <div className="text-center font-mono text-cyan/50 text-xs md:text-sm tracking-widest mt-6 blink">WAITING FOR HOST...</div>
            )}
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 py-6 md:py-8 text-center">
             <div className="font-mono uppercase tracking-[0.2em] text-cyan/60 mb-2 text-xs md:text-sm">Category</div>
             <div className="font-orbitron text-xl md:text-2xl tracking-widest px-4">{currentRoom.category}</div>
             
             <div className="mt-8 md:mt-12">
                <button 
                  onMouseDown={() => setShowRole(true)} 
                  onMouseUp={() => setShowRole(false)}
                  onTouchStart={() => setShowRole(true)}
                  onTouchEnd={() => setShowRole(false)}
                  className="jarvis-button w-full py-4 md:py-6 relative overflow-hidden group select-none"
                >
                  <span className="relative z-10 text-sm md:text-base">{showRole ? "RELEASE TO HIDE" : "HOLD TO REVEAL ROLE"}</span>
                  <div className="absolute inset-0 bg-cyan/20 translate-y-[100%] group-active:translate-y-0 transition-transform duration-100"></div>
                </button>
             </div>
             
             <div className={`mt-6 md:mt-8 transition-opacity duration-300 ${showRole ? 'opacity-100' : 'opacity-0'}`}>
                {isImposter ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="font-orbitron text-xl md:text-3xl font-bold text-red tracking-widest drop-shadow-[0_0_15px_rgba(255,23,68,0.8)] mb-2">
                      YOU ARE THE IMPOSTER
                    </div>
                    <div className="font-mono uppercase tracking-[0.2em] text-cyan/60 text-xs md:text-sm">Your Secret Word</div>
                    <div className="font-orbitron text-2xl md:text-4xl font-bold text-cyan tracking-widest drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                      {secretWord}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-mono uppercase tracking-[0.2em] text-cyan/60 mb-2 text-xs md:text-sm">Secret Word</div>
                    <div className="font-orbitron text-2xl md:text-4xl font-bold text-cyan tracking-widest drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                      {secretWord}
                    </div>
                  </div>
                )}
             </div>

             {isHost && (
               <div className="mt-8 pt-4 border-t border-cyan/20">
                 <button 
                   onClick={() => endRound('end-round')} 
                   disabled={loading} 
                   className="jarvis-button w-full !border-orange-500 !text-orange-500 hover:!bg-orange-500/10 text-sm md:text-base py-3"
                 >
                   NEXT ROUND (LOBBY)
                 </button>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
