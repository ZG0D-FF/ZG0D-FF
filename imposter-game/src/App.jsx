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
    const [chatMessages, setChatMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
  const [selectedVote, setSelectedVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideStep, setGuideStep] = useState(0);

  const guideSlides = [
    { 
      title: "1. THE LOBBY & SETUP", 
      text: "\"Beware of Greeks bearing gifts.\" (The Trojan Horse)\n\nClick 'CREATE ROOM' or 'JOIN'. When ready, the Host clicks 'INITIATE PROTOCOL'. Everyone gets the exact same Secret Word... except the Imposter, who gets a slightly different word!" 
    },
    { 
      title: "2. YOUR SECRET WORD", 
      text: "\"Even the gods wear masks when they walk among mortals.\" (Homer)\n\nPress and hold the 'HOLD TO REVEAL ROLE' button to privately peek at your word. Make sure nobody is looking over your shoulder!" 
    },
    { 
      title: "3. THE INTERROGATION", 
      text: "\"Speak, memory—of the cunning hero, the wanderer, blown off course.\" (The Odyssey)\n\nTake turns giving ONE-WORD clues. If your clue is too obvious, the Imposter will blend in. If it's too vague, the Crewmates will suspect YOU!" 
    },
    { 
      title: "4. THE VOTING PHASE", 
      text: "\"There is no hiding from the eyes of Zeus.\" (Hesiod)\n\nWhen discussion ends, the Host clicks 'START VOTING'. A list of players will appear. Select the suspected Imposter and click 'LOCK VOTE', or choose 'SKIP VOTE'." 
    },
    { 
      title: "5. THE TALLY", 
      text: "\"And into the abyss of Tartarus they fell, cast out by their own kin.\" (Theogony)\n\nOnce votes are locked, the Host clicks 'FORCE END VOTING'. The system ejects the loser. Did you catch the Imposter, or doom an innocent Crewmate?" 
    },
    { 
      title: "6. GHOSTS & COMMS", 
      text: "\"The dead have nothing but the whispering wind.\" (Hades)\n\nVoted out? You become a Ghost! Click the circular Chat bubble in the bottom right corner at any time to open the comms drawer and haunt the room." 
    }
  ];
    const [connectionError, setConnectionError] = useState(false);
    const [recentPlayerName, setRecentPlayerName] = useState(localStorage.getItem('imposter_recent_name') || '');
	
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
    // AUTO-SYNC: Fetch latest state when user tabs back in
  useEffect(() => {
    if (!currentRoom?.id) return;

    const syncRoomState = async () => {
      console.log("Auto-Syncing room state...");
      const { data } = await supabase.from('imposter_rooms').select('*').eq('id', currentRoom.id).single();
      if (data) {
        setCurrentRoom(data);
        fetchPlayers(data.id);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncRoomState();
    };
    
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', syncRoomState);
    
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', syncRoomState);
    };
  }, [currentRoom?.id]);

  useEffect(() => {
    if (!currentRoom?.id) return;
    const roomId = currentRoom.id;

    const roomSub = supabase
      .channel(`room:${roomId}`, { config: { broadcast: { self: false } } })
      .on('broadcast', { event: 'chat' }, (payload) => {
        setChatMessages(prev => [payload.payload, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'imposter_rooms', filter: `id=eq.${roomId}` }, 
        (payload) => {
          console.log("Room updated:", payload.new.status);
          setCurrentRoom(payload.new);
        }
      )
      .subscribe((status) => {
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          console.error("Socket disconnected!");
          setConnectionError(true);
        }
      });

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
      localStorage.setItem('imposter_recent_name', playerName);
      setRecentPlayerName(playerName);
      setRecentRoomCode(data.room.room_code);
      await fetchPlayers(data.room.id);
      console.log("Room created securely");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const rejoinRecentRoom = async () => {
    if (!recentRoomCode || !recentPlayerName) {
       alert("Missing saved data. Please join manually.");
       return;
    }
    setLoading(true);
    
    try {
      const secretToken = localStorage.getItem('imposter_secret');
      const res = await fetch('/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomCode: recentRoomCode, 
          playerName: recentPlayerName, 
          playerId, 
          secretToken, 
          isCreating: false 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to rejoin room");

      setIsHost(data.isHost);
      setCurrentRoom(data.room);
      await fetchPlayers(data.room.id);
      console.log("1-Click Rejoin Successful");
    } catch (err) {
      alert("Room no longer exists or expired.");
      // Auto-clean the dead room from storage
      localStorage.removeItem('imposter_recent_room');
      setRecentRoomCode('');
    }
    setLoading(false);
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
      localStorage.setItem('imposter_recent_name', playerName);
      setRecentPlayerName(playerName);
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
    const submitVote = async () => {
    if (!selectedVote) return;
    setLoading(true);
    // (In the next task, we will connect this to the actual backend!)
    console.log("Voted for:", selectedVote);
    setTimeout(() => {
      setHasVoted(true);
      setLoading(false);
    }, 500);
  };
  
    const tallyVotes = async () => {
    if (!confirm("Force end voting and tally results?")) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tally-votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: currentRoom.id, secretToken: localStorage.getItem('imposter_secret') })
      });
      if (!res.ok) throw new Error("Failed to tally votes");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };
  
  const startVotingPhase = async () => {
    if (!confirm("Are you sure you want to start the voting phase?")) return;
    setLoading(true);
    try {
      const res = await fetch('/api/start-voting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: currentRoom.id, secretToken: localStorage.getItem('imposter_secret') })
      });
      if (!res.ok) throw new Error("Failed to start voting");
    } catch(err) {
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
      {/* FATAL ERROR POP-UP */}
      {connectionError && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center p-4 backdrop-blur-md">
          <div className="jarvis-panel p-8 text-center max-w-md w-full border-red/50 shadow-[0_0_40px_rgba(255,0,0,0.4)]">
            <h2 className="font-orbitron text-red text-2xl md:text-3xl font-bold mb-4 blink tracking-widest">CONNECTION LOST</h2>
            <p className="font-mono text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
              Your device disconnected from the central mainframe. The UI is out of sync with the game.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="jarvis-button w-full !border-red !text-red hover:!bg-red/20 py-4 text-sm md:text-base"
            >
              REBOOT SYSTEM (RELOAD)
            </button>
          </div>
        </div>
      )}
        <div className="scanlines"></div>
        <div className="jarvis-panel p-6 md:p-8 w-full max-w-md text-center space-y-6 md:space-y-8 z-10 transition-all">
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold tracking-[0.2em] text-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">WORD IMPOSTER</h1>
          
          {recentRoomCode && (
            <div className="bg-cyan/10 border border-cyan/30 p-4 rounded-md space-y-3">
              <div className="text-xs text-cyan/70 font-mono tracking-widest">RECENT ROOM FOUND</div>
              <button 
                onClick={rejoinRecentRoom} 
                disabled={loading}
                className="jarvis-button w-full !border-cyan !text-cyan hover:!bg-cyan/20 text-xs md:text-sm py-4"
              >
                1-CLICK REJOIN [{recentRoomCode}] AS {recentPlayerName || "PLAYER"}
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
                <a 
                  href="https://discord.gg/YOUR_INVITE_LINK_HERE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#5865F2]/50 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] px-3 py-1 text-xs font-mono uppercase transition-all shadow-[0_0_10px_rgba(88,101,242,0.2)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.05.05 0 0 0-.018-.011 8.8 8.8 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007c.08.066.164.132.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019zM5.82 8.783c-.761 0-1.385-.69-1.385-1.536 0-.847.614-1.537 1.385-1.537.779 0 1.396.69 1.385 1.537 0 .846-.606 1.536-1.385 1.536zm4.361 0c-.761 0-1.385-.69-1.385-1.536 0-.847.614-1.537 1.385-1.537.779 0 1.396.69 1.385 1.537 0 .846-.606 1.536-1.385 1.536z"/>
                  </svg>
                  VOICE
                </a>
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
             
             {currentRoom.status === 'voting' ? (
                <div className="mt-8 border border-purple-500/30 bg-purple-500/5 p-4 md:p-6 rounded-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                   <h3 className="font-orbitron text-xl md:text-2xl text-purple-400 tracking-widest mb-6 blink uppercase">VOTING PHASE</h3>
                   <div className="space-y-3 text-left">
                     {players.map(p => (
                       <label key={p.id} className={`flex items-center p-3 md:p-4 border cursor-pointer transition-colors ${selectedVote === p.id ? 'border-purple-500 bg-purple-500/20' : 'border-cyan/20 hover:border-purple-500/50'}`}>
                         <input type="radio" name="vote" className="hidden" checked={selectedVote === p.id} onChange={() => !hasVoted && setSelectedVote(p.id)} disabled={hasVoted} />
                         <span className={`font-mono text-sm md:text-base uppercase ${selectedVote === p.id ? 'text-purple-400' : 'text-cyan/70'}`}>{p.name} {p.player_id === playerId ? '(YOU)' : ''}</span>
                       </label>
                     ))}
                     
                     <div className="pt-2">
                       <label className={`flex items-center p-3 md:p-4 border cursor-pointer transition-colors ${selectedVote === 'SKIP' ? 'border-orange-500 bg-orange-500/20' : 'border-cyan/20 hover:border-orange-500/50'}`}>
                         <input type="radio" name="vote" className="hidden" checked={selectedVote === 'SKIP'} onChange={() => !hasVoted && setSelectedVote('SKIP')} disabled={hasVoted} />
                         <span className={`font-mono text-sm md:text-base uppercase tracking-widest ${selectedVote === 'SKIP' ? 'text-orange-500' : 'text-cyan/70'}`}>SKIP VOTE</span>
                       </label>
                     </div>
                   </div>
                   
                   {!hasVoted ? (
                     <button 
                       onClick={submitVote}
                       disabled={!selectedVote || loading}
                       className="jarvis-button w-full mt-6 !border-purple-500 !text-purple-500 hover:!bg-purple-500/10 py-4"
                     >
                       LOCK VOTE
                     </button>
                   ) : (
                     <div className="mt-6 text-cyan/50 font-mono text-xs md:text-sm tracking-widest blink">VOTE LOCKED IN. WAITING FOR OTHERS...</div>
                   )}

                   {isHost && (
                     <div className="mt-8 pt-4 border-t border-purple-500/30">
                       <button onClick={tallyVotes} disabled={loading} className="jarvis-button w-full !border-red/50 !text-red/50 hover:!bg-red/10 py-3 text-xs md:text-sm">
                         FORCE END VOTING
                       </button>
                     </div>
                   )}
                </div>
             ) : (
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
             )}
             
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
               <div className="mt-8 pt-4 border-t border-cyan/20 flex gap-2">
                 <button 
                   onClick={startVotingPhase} 
                   disabled={loading} 
                   className="jarvis-button flex-1 !border-purple-500 !text-purple-500 hover:!bg-purple-500/10 text-xs md:text-sm py-3"
                 >
                   START VOTING
                 </button>
                 <button 
                   onClick={() => endRound('end-round')} 
                   disabled={loading} 
                   className="jarvis-button flex-1 !border-orange-500 !text-orange-500 hover:!bg-orange-500/10 text-xs md:text-sm py-3"
                 >
                   ABORT TO LOBBY
                 </button>
               </div>
             )}
          </div>
        )}
      </div>
	        {/* CHAT TOGGLE BUTTON */}
      {currentRoom && (
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="fixed bottom-4 right-4 bg-cyan/10 border border-cyan/50 text-cyan p-3 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.2)] z-40 hover:bg-cyan/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
          </svg>
        </button>
      )}

      {/* CHAT DRAWER */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-cyan/30 p-4 transition-transform duration-300 z-50 shadow-[0_-10px_40px_rgba(0,255,255,0.1)] flex flex-col ${isChatOpen ? 'translate-y-0' : 'translate-y-full'}`} 
        style={{ height: '60vh' }}
      >
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h3 className="font-mono text-cyan text-sm md:text-base uppercase tracking-widest">Room Comms</h3>
          <button onClick={() => setIsChatOpen(false)} className="text-cyan/70 hover:text-red p-2 text-xl leading-none">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 flex flex-col-reverse pr-2">
          {chatMessages.map((msg, i) => (
            <div key={i} className="text-sm font-mono break-words">
              <span className="text-cyan/70 font-bold">[{msg.player}]:</span> <span className="text-gray-300">{msg.text}</span>
            </div>
          ))}
          {chatMessages.length === 0 && <div className="text-cyan/30 text-xs text-center pb-4 font-mono">NO MESSAGES YET...</div>}
        </div>

        <form 
          className="flex gap-2 shrink-0"
          onSubmit={(e) => {
            e.preventDefault();
            if (!chatInput.trim() || !currentRoom) return;
            const payload = { player: playerName, text: chatInput.trim(), timestamp: Date.now() };
            setChatMessages(prev => [payload, ...prev]);
            setChatInput('');
            supabase.channel(`room:${currentRoom.id}`).send({ type: 'broadcast', event: 'chat', payload });
          }}
        >
          <input 
            value={chatInput} 
            onChange={e => setChatInput(e.target.value)} 
            className="jarvis-input w-full text-sm !text-left" 
            placeholder="TRANSMIT MESSAGE..." 
            maxLength={100}
          />
          <button type="submit" className="jarvis-button text-sm px-4">SEND</button>
        </form>
      </div>
      {/* FLOATING GUIDE BUTTON */}
      <button 
        onClick={() => { setIsGuideOpen(true); setGuideStep(0); }} 
        className="fixed top-4 right-4 bg-cyan/10 border border-cyan/50 text-cyan w-10 h-10 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.2)] z-40 hover:bg-cyan/20 transition-all font-orbitron text-xl flex items-center justify-center"
      >
        ?
      </button>

      {/* GUIDE CAROUSEL MODAL */}
      {isGuideOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="jarvis-panel p-6 md:p-8 w-full max-w-md relative shadow-[0_0_40px_rgba(0,255,255,0.15)] border border-cyan/40 bg-black/90">
            {/* Close Button */}
            <button onClick={() => setIsGuideOpen(false)} className="absolute top-4 right-4 text-cyan/50 hover:text-red font-mono text-xl leading-none">✕</button>
            
            {/* Slide Content */}
            <div className="text-center min-h-[180px] flex flex-col justify-center">
              <h2 className="font-orbitron text-xl md:text-2xl font-bold tracking-widest text-cyan mb-4 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] uppercase">
                {guideSlides[guideStep].title}
              </h2>
              <p className="font-mono text-gray-300 text-sm md:text-base leading-relaxed">
                {guideSlides[guideStep].text}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={() => setGuideStep(prev => Math.max(0, prev - 1))}
                disabled={guideStep === 0}
                className="jarvis-button px-4 py-2 text-xs opacity-80 hover:opacity-100 disabled:opacity-30 disabled:border-gray-600 disabled:text-gray-600"
              >
                PREV
              </button>
              
              <div className="flex gap-2">
                {guideSlides.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === guideStep ? 'bg-cyan shadow-[0_0_8px_rgba(0,255,255,1)]' : 'bg-cyan/20'}`} />
                ))}
              </div>

              {guideStep < guideSlides.length - 1 ? (
                <button 
                  onClick={() => setGuideStep(prev => Math.min(guideSlides.length - 1, prev + 1))}
                  className="jarvis-button px-4 py-2 text-xs"
                >
                  NEXT
                </button>
              ) : (
                <button 
                  onClick={() => setIsGuideOpen(false)}
                  className="jarvis-button !border-purple-500 !text-purple-500 hover:!bg-purple-500/10 px-4 py-2 text-xs"
                >
                  START
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
