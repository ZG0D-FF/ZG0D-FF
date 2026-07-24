@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>nul
title Auto Compiler v2 - Syntax Checker + Diagnostics Hub

:: =====================================================================
:: AUTO COMPILER v2 — Syntax-Only Checker + Diagnostics Hub
:: Reads exclusions from .compilerignore
:: Checks: Python, C, C++, Java, JS, TS, JSON, HTML, CSS
:: Diagnostics: Dependency report, Size audit, Env health check, Secrets
:: =====================================================================

set "ROOT=%~dp0"
cd /d "%ROOT%"
set "BUILD=%ROOT%build"
set "ERRDIR=%BUILD%\errors"
set "DIAGDIR=%BUILD%\diagnostics"
set "LOG=%BUILD%\build_log.txt"
set "IGNORE=%ROOT%.compilerignore"

if not exist "%BUILD%" mkdir "%BUILD%"
if not exist "%ERRDIR%" mkdir "%ERRDIR%"
if not exist "%DIAGDIR%" mkdir "%DIAGDIR%"

> "%LOG%" echo ================================================
>> "%LOG%" echo  AUTO COMPILER v2 - %DATE% %TIME%
>> "%LOG%" echo ================================================

:: ---------------------------------------------------------------
:: PHASE 0: Color Detection
:: ---------------------------------------------------------------
set "USE_COLOR=0"
if defined WT_SESSION set "USE_COLOR=1"
if defined TERM_PROGRAM set "USE_COLOR=1"

if "!USE_COLOR!"=="1" (
    for /f %%e in ('powershell -NoProfile -Command "[char]27"') do set "ESC=%%e"
    set "G=!ESC![92m"
    set "R=!ESC![91m"
    set "Y=!ESC![93m"
    set "B=!ESC![96m"
    set "D=!ESC![90m"
    set "W=!ESC![97m"
    set "N=!ESC![0m"
) else (
    set "G=" & set "R=" & set "Y=" & set "B=" & set "D=" & set "W=" & set "N="
)

echo.
echo !W!=========================================!N!
echo !W!  AUTO COMPILER V3!N!
echo !D!  %ROOT%!N!
echo !W!=========================================!N!
echo.

:: ---------------------------------------------------------------
:: CLI ARGUMENT PARSER
:: ---------------------------------------------------------------
if "%~1"=="" goto :MAIN_MENU

if /i "%~1"=="--help" (
    echo.
    echo !B!AUTO COMPILER V3 - CLI ARGUMENTS!N!
    echo   --help            : Shows all commands.
    echo   --check           : Syntax check only.
    echo   --run             : Runs the project.
    echo   --folder ^<path^>   : Syntax check on specific subfolder.
    echo   --backup          : Zips the project to backups/.
    echo.
    exit /b 0
)
if /i "%~1"=="--check" (
    call :RAM_ALLOCATION
    goto :PHASE_1
)
if /i "%~1"=="--run" (
    goto :SMART_EXEC
)
if /i "%~1"=="--folder" (
    if not "%~2"=="" set "ROOT=%ROOT%%~2\"
    call :RAM_ALLOCATION
    goto :PHASE_1
)
if /i "%~1"=="--backup" (
    goto :BACKUP_SYS
)

goto :MAIN_MENU

:: ---------------------------------------------------------------
:: PHASE 1: Read .compilerignore
:: ---------------------------------------------------------------
:PHASE_1
set "EXCL="
if exist "%IGNORE%" (
    echo !B![INFO]!N! Reading .compilerignore...
    for /f "usebackq eol=# delims=" %%L in ("%IGNORE%") do (
        if not "%%L"=="" (
            set "EXCL=!EXCL! /c:"\\%%L\\""
            echo   !D!Excluding: %%L!N!
        )
    )
) else (
    echo !Y![SKIP]!N! .compilerignore not found. Using defaults.
    set "EXCL=/c:"\\node_modules\\" /c:"\\.git\\" /c:"\\build\\""
)
>> "%LOG%" echo Exclusions: !EXCL!
echo.

:: ---------------------------------------------------------------
:: PHASE 2: Tool Availability
:: ---------------------------------------------------------------
set "HAS_PY=0"    & where python >nul 2>nul && set "HAS_PY=1"
set "HAS_GCC=0"   & where gcc    >nul 2>nul && set "HAS_GCC=1"
set "HAS_GPP=0"   & where g++    >nul 2>nul && set "HAS_GPP=1"
set "HAS_JAVAC=0"  & where javac >nul 2>nul && set "HAS_JAVAC=1"
set "HAS_NODE=0"  & where node   >nul 2>nul && set "HAS_NODE=1"
set "HAS_TSC=0"   & where tsc    >nul 2>nul && set "HAS_TSC=1"
echo !D!Tools: py=!HAS_PY! gcc=!HAS_GCC! g++=!HAS_GPP! javac=!HAS_JAVAC! node=!HAS_NODE! tsc=!HAS_TSC!!N!
>> "%LOG%" echo Tools: py=!HAS_PY! gcc=!HAS_GCC! g++=!HAS_GPP! javac=!HAS_JAVAC! node=!HAS_NODE! tsc=!HAS_TSC!
echo.

:: ---------------------------------------------------------------
:: PHASE 3: Counters
:: ---------------------------------------------------------------
set /a T_PY=0,  T_C=0,  T_CPP=0,  T_JAVA=0,  T_JS=0,  T_TS=0,  T_JSON=0,  T_HTML=0,  T_CSS=0
set /a P_PY=0,  P_C=0,  P_CPP=0,  P_JAVA=0,  P_JS=0,  P_TS=0,  P_JSON=0,  P_HTML=0,  P_CSS=0
set /a F_PY=0,  F_C=0,  F_CPP=0,  F_JAVA=0,  F_JS=0,  F_TS=0,  F_JSON=0,  F_HTML=0,  F_CSS=0

:: ---------------------------------------------------------------
:: PHASE 4: Build Filtered File List + Process
:: ---------------------------------------------------------------
set "FL=%TEMP%\ac_%RANDOM%.tmp"
dir /b /s /a:-d "%ROOT%" 2>nul > "!FL!.raw"
if defined EXCL (
    findstr /v /i !EXCL! "!FL!.raw" > "!FL!" 2>nul
) else (
    copy "!FL!.raw" "!FL!" >nul
)

:: --- DEBUG LOGGING ---
copy "!FL!.raw" "%BUILD%\debug_raw_files.txt" >nul 2>nul
copy "!FL!" "%BUILD%\debug_filtered_files.txt" >nul 2>nul
>> "%LOG%" echo [DEBUG] Raw files scanned: %BUILD%\debug_raw_files.txt
>> "%LOG%" echo [DEBUG] Files after filter: %BUILD%\debug_filtered_files.txt
:: ---------------------

echo !W!--- SYNTAX CHECKS ---!N!
>> "%LOG%" echo.
>> "%LOG%" echo --- SYNTAX CHECKS ---

for /f "usebackq delims=" %%F in ("!FL!") do (
    set "EXT=%%~xF"
    set "REL=%%F"
    set "REL=!REL:%ROOT%=!"
    set "SAFE_NAME=!REL:\=#!"

    if /i "!EXT!"==".py"   call :CHK_PY   "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".c"    call :CHK_C    "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".cpp"  call :CHK_CPP  "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".java" call :CHK_JAVA "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".js"   call :CHK_JS   "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".mjs"  call :CHK_JS   "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".ts"   call :CHK_TS   "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".json" call :CHK_JSON "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".html" call :CHK_HTML "%%F" "!REL!" "!SAFE_NAME!"
    if /i "!EXT!"==".css"  call :CHK_CSS  "%%F" "!REL!" "!SAFE_NAME!"
)

del "!FL!.raw" 2>nul
del "!FL!" 2>nul
goto :DIAG

:: =====================================================================
:: SYNTAX CHECK HANDLERS (syntax-only, NEVER execute)
:: =====================================================================

:CHK_PY
set /a T_PY+=1
if "!HAS_PY!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
python -m py_compile "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_PY+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_PY+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_C
set /a T_C+=1
if "!HAS_GCC!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
gcc -fsyntax-only "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_C+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_C+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_CPP
set /a T_CPP+=1
if "!HAS_GPP!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
g++ -fsyntax-only "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_CPP+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_CPP+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_JAVA
set /a T_JAVA+=1
if "!HAS_JAVAC!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
set "JTD=%TEMP%\ac_java_!RANDOM!"
javac -d "!JTD!" "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_JAVA+=1 & del "%ERRDIR%\%~3.err" 2>nul & rd /s /q "!JTD!" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_JAVA+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_JS
set /a T_JS+=1
if "!HAS_NODE!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
node --check "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_JS+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_JS+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_TS
set /a T_TS+=1
if "!HAS_TSC!"=="0" ( echo   !Y![SKIP]!N! !D!%~2!N! & goto :eof )
call tsc --noEmit "%~1" 2> "%ERRDIR%\%~3.err"
if !ERRORLEVEL! EQU 0 ( set /a P_TS+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_TS+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
goto :eof

:CHK_JSON
set /a T_JSON+=1
> "%TEMP%\ac_json.ps1" echo try{$null=ConvertFrom-Json -InputObject (Get-Content '%~1' -Raw -ErrorAction Stop);exit 0}catch{Set-Content '%ERRDIR%\%~3.err' $_.Exception.Message;exit 1}
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_json.ps1"
if !ERRORLEVEL! EQU 0 ( set /a P_JSON+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_JSON+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
del "%TEMP%\ac_json.ps1" 2>nul
goto :eof

:CHK_HTML
set /a T_HTML+=1
:: HTML validation: DOCTYPE, tag balance, charset, viewport
> "%TEMP%\ac_html.ps1" echo $c=Get-Content '%~1' -Raw;$e=@();if($c-notmatch'DOCTYPE'){$e+='Missing DOCTYPE'};foreach($t in @('html','head','body','script','style')){$p1='[char]60'+$t+'[\s[char]62]';$p2='[char]60/'+$t;$o=([regex]::Matches($c,$p1)).Count;$cl=([regex]::Matches($c,$p2)).Count;if($o-ne$cl){$e+=$t+': '+$o+' open vs '+$cl+' close'}};if($c-notmatch'charset'){$e+='No charset'};if($c-notmatch'viewport'){$e+='No viewport'};if($e.Count){Set-Content '%ERRDIR%\%~3.err' ($e-join[char]10);exit 1};exit 0
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_html.ps1"
if !ERRORLEVEL! EQU 0 ( set /a P_HTML+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_HTML+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
del "%TEMP%\ac_html.ps1" 2>nul
goto :eof

:CHK_CSS
set /a T_CSS+=1
:: CSS: brace balance check
> "%TEMP%\ac_css.ps1" echo $c=Get-Content '%~1' -Raw;$o=([regex]::Matches($c,'{')).Count;$cl=([regex]::Matches($c,'}')).Count;if($o-ne$cl){Set-Content '%ERRDIR%\%~3.err' ('Brace mismatch: '+$o+' open vs '+$cl+' close');exit 1};exit 0
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_css.ps1"
if !ERRORLEVEL! EQU 0 ( set /a P_CSS+=1 & del "%ERRDIR%\%~3.err" 2>nul & echo   !G![PASS]!N! %~2 & >> "%LOG%" echo [PASS] %~2 ) else ( set /a F_CSS+=1 & echo   !R![FAIL]!N! %~2 & >> "%LOG%" echo [FAIL] %~2 )
del "%TEMP%\ac_css.ps1" 2>nul
goto :eof

:: =====================================================================
:: DIAGNOSTICS HUB
:: =====================================================================
:DIAG
echo.
echo !W!--- DIAGNOSTICS HUB ---!N!
>> "%LOG%" echo.
>> "%LOG%" echo --- DIAGNOSTICS HUB ---

:: 1. Dependency Report
echo.
echo !B![INFO]!N! Generating dependency report...
if exist "%ROOT%pnpm-lock.yaml" (
    call pnpm ls --depth=2 > "%DIAGDIR%\dependencies.txt" 2>&1
) else if exist "%ROOT%package.json" (
    call npm ls > "%DIAGDIR%\dependencies.txt" 2>&1
) else (
    echo No package manager found. > "%DIAGDIR%\dependencies.txt"
)
echo   !D!Saved to build\diagnostics\dependencies.txt!N!
>> "%LOG%" echo [DIAG] Dependency report saved

:: 2. Size Audit (top 40 largest files, excludes ignored dirs)
echo !B![INFO]!N! Running size audit...
> "%TEMP%\ac_size.ps1" echo Get-ChildItem '%ROOT%' -Recurse -File -ErrorAction SilentlyContinue ^| Where-Object {$_.FullName -notmatch '\\node_modules\\^|\\\.git\\^|\\build\\'} ^| Sort-Object Length -Descending ^| Select-Object -First 40 @{N='Size_KB';E={[math]::Round($_.Length/1KB,1)}},@{N='File';E={$_.FullName.Replace('%ROOT%','')}} ^| Format-Table -AutoSize ^| Out-String -Width 200 ^| Set-Content '%DIAGDIR%\size_audit.txt'
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_size.ps1"
del "%TEMP%\ac_size.ps1" 2>nul
echo   !D!Saved to build\diagnostics\size_audit.txt!N!
>> "%LOG%" echo [DIAG] Size audit saved

:: 3. Environment Health Check (worker.js env vars vs .env file)
echo !B![INFO]!N! Running env health check...
> "%TEMP%\ac_env.ps1" echo $code=Get-Content '%ROOT%worker.js' -Raw -ErrorAction SilentlyContinue;if(-not $code){Set-Content '%DIAGDIR%\env_health.txt' 'worker.js not found';exit};$cv=[regex]::Matches($code,'(?:context\.)?env\.([A-Z][A-Z0-9_]+)') ^| ForEach-Object{$_.Groups[1].Value} ^| Sort-Object -Unique;$ev=@{};if(Test-Path '%ROOT%.env'){Get-Content '%ROOT%.env' ^| Where-Object{$_ -match '^([A-Za-z_]\w*)='} ^| ForEach-Object{$ev[$Matches[1]]=$true}};$o=@('=== ENV HEALTH CHECK ===','','Variables in worker.js:');foreach($v in $cv){$s='[MISS] ';if($ev.ContainsKey($v)){$s='[OK]   '};$o+=$s+$v};$o+=@('','Extra in .env (not in code):');foreach($k in ($ev.Keys ^| Sort-Object)){if($cv -notcontains $k){$o+='[EXTRA] '+$k}};Set-Content '%DIAGDIR%\env_health.txt' $o
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_env.ps1"
del "%TEMP%\ac_env.ps1" 2>nul
echo   !D!Saved to build\diagnostics\env_health.txt!N!
>> "%LOG%" echo [DIAG] Env health check saved

:: 4. Secret Scanner (detect hardcoded keys in code files)
echo !B![INFO]!N! Running secret scanner...
> "%TEMP%\ac_sec.ps1" echo $pats=@('sk_live_','sk_test_','ghp_','gho_','sb_secret_','AIzaSy','Bearer ey');$files=Get-ChildItem '%ROOT%' -Recurse -Include '*.js','*.html' -File -ErrorAction SilentlyContinue ^| Where-Object{$_.FullName -notmatch '\\node_modules\\^|\\\.git\\^|\\build\\' -and $_.Name -ne '.env'};$hits=@();foreach($f in $files){$c=Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue;foreach($p in $pats){if($c -match [regex]::Escape($p)){$hits+='[WARN] '+$f.Name+': contains pattern '+$p}}};if($hits.Count){Set-Content '%DIAGDIR%\secret_scan.txt' $hits;Write-Host ('  Found '+$hits.Count+' potential secret(s) in code files')}else{Set-Content '%DIAGDIR%\secret_scan.txt' 'No hardcoded secrets detected.';Write-Host '  Clean - no secrets detected.'}
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_sec.ps1"
del "%TEMP%\ac_sec.ps1" 2>nul
echo   !D!Saved to build\diagnostics\secret_scan.txt!N!
>> "%LOG%" echo [DIAG] Secret scan saved
echo.

:: =====================================================================
:: SUMMARY
:: =====================================================================
set /a TOTAL=T_PY+T_C+T_CPP+T_JAVA+T_JS+T_TS+T_JSON+T_HTML+T_CSS
set /a PASS=P_PY+P_C+P_CPP+P_JAVA+P_JS+P_TS+P_JSON+P_HTML+P_CSS
set /a FAIL=F_PY+F_C+F_CPP+F_JAVA+F_JS+F_TS+F_JSON+F_HTML+F_CSS

echo !W!=========================================!N!
echo !W!  RESULTS!N!
echo !W!=========================================!N!
echo.
echo   !B!Python!N!      :  !P_PY!/!T_PY! passed
echo   !B!C!N!           :  !P_C!/!T_C! passed
echo   !B!C++!N!         :  !P_CPP!/!T_CPP! passed
echo   !B!Java!N!        :  !P_JAVA!/!T_JAVA! passed
echo   !B!JavaScript!N!  :  !P_JS!/!T_JS! passed
echo   !B!TypeScript!N!  :  !P_TS!/!T_TS! passed
echo   !B!JSON!N!        :  !P_JSON!/!T_JSON! passed
echo   !B!HTML!N!        :  !P_HTML!/!T_HTML! passed
echo   !B!CSS!N!         :  !P_CSS!/!T_CSS! passed
echo.
if !FAIL! GTR 0 (
    echo   !R!TOTAL: !PASS!/!TOTAL! passed, !FAIL! FAILED!N!
    echo   !R!Error details in: build\errors\!N!
) else (
    echo   !G!TOTAL: !PASS!/!TOTAL! passed, 0 failed!N!
)
echo   !B!Diagnostics:  build\diagnostics\!N!
echo   !D!Full log:     build\build_log.txt!N!
echo.

>> "%LOG%" echo.
>> "%LOG%" echo SUMMARY: %PASS%/%TOTAL% passed, %FAIL% failed
>> "%LOG%" echo Python %P_PY%/%T_PY%  C %P_C%/%T_C%  C++ %P_CPP%/%T_CPP%  Java %P_JAVA%/%T_JAVA%  JS %P_JS%/%T_JS%  TS %P_TS%/%T_TS%  JSON %P_JSON%/%T_JSON%  HTML %P_HTML%/%T_HTML%  CSS %P_CSS%/%T_CSS%

pause
goto :MAIN_MENU

:: =====================================================================
:: AUTO COMPILER V3: DYNAMIC ENGINE
:: =====================================================================
:MAIN_MENU
cls
set "ROOT=%~dp0"
echo !W!=========================================!N!
echo !B!       AUTO COMPILER V3 MENU!N!
echo !W!=========================================!N!
echo 1) Run Syntax Check (Interactive Folder)
echo 2) Run Project (Dynamic Execution)
echo 3) Run Full Backup (ZIP)
echo 4) Exit
set "CHOICE="
set /p "CHOICE=Select an option: "

if "!CHOICE!"=="1" goto :TARGET_FOLDER
if "!CHOICE!"=="2" goto :SMART_EXEC
if "!CHOICE!"=="3" goto :BACKUP_SYS
if "!CHOICE!"=="4" exit /b 0
goto :MAIN_MENU

:RAM_ALLOCATION
echo.
echo !B![RESOURCE MONITOR]!N! Checking Hardware...

set "FREE_MB=0"

:: Tier 1: WMIC (Safest for batch parsing, no complex symbols)
for /f "skip=1" %%M in ('wmic OS get FreePhysicalMemory 2^>nul') do set /a FREE_MB=%%M / 1024

:: Tier 2: Node.js Hook (Safe via Temp Script)
set /a CHK=FREE_MB
if !CHK! GTR 0 goto :SKIP_NODE
> "%TEMP%\ac_mem.js" echo console.log(Math.round(require('os').freemem()/1024/1024));
for /f "usebackq delims=" %%M in (`node "%TEMP%\ac_mem.js" 2^>nul`) do set "FREE_MB=%%M"
del "%TEMP%\ac_mem.js" 2>nul
:SKIP_NODE

:: Tier 3: PowerShell Hook (Safe via Temp Script)
set /a CHK=FREE_MB
if !CHK! GTR 0 goto :SKIP_PS
> "%TEMP%\ac_mem.ps1" echo $mem=(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory; [math]::Round($mem / 1024)
for /f "usebackq delims=" %%M in (`powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_mem.ps1" 2^>nul`) do set "FREE_MB=%%M"
del "%TEMP%\ac_mem.ps1" 2>nul
:SKIP_PS

:: FAILSAFE: Strict integer mathematical check (strips hidden characters)
set /a FINAL_MB=FREE_MB
if !FINAL_MB! LEQ 0 set "FINAL_MB=1024"
set "FREE_MB=!FINAL_MB!"

set /a S_25=FREE_MB / 4
set /a S_50=FREE_MB / 2
set /a S_75=FREE_MB * 3 / 4
set /a S_80=FREE_MB * 8 / 10

echo !W!Available Free RAM: !FREE_MB! MB!N!
echo 1) 25%% (Approx !S_25! MB)
echo 2) 50%% (Approx !S_50! MB)
echo 3) 75%% (Approx !S_75! MB)
echo 4) 80%% (Safe Max: !S_80! MB)
echo 5) Custom (Minimum required: 64 MB)
set "RAM_CHOICE="
set /p "RAM_CHOICE=Allocate RAM (Enter 1-5): "

if "!RAM_CHOICE!"=="1" set "ALLOC=!S_25!"
if "!RAM_CHOICE!"=="2" set "ALLOC=!S_50!"
if "!RAM_CHOICE!"=="3" set "ALLOC=!S_75!"
if "!RAM_CHOICE!"=="4" set "ALLOC=!S_80!"
if "!RAM_CHOICE!"=="5" (
    set "ALLOC="
    set /p "ALLOC=Enter MB: "
)

:: Global strict minimum limit (V8 engine crashes under 32-64MB)
set /a CHK_ALLOC=ALLOC
if !CHK_ALLOC! LSS 64 (
    echo !Y!Warning: !ALLOC! MB is physically too low for compilers to boot. Forcing safe minimum of 64 MB.!N!
    set "ALLOC=64"
)

set "NODE_OPTIONS=--max-old-space-size=!ALLOC!"
echo !G!Locked in !ALLOC! MB for compiler tasks.!N!
goto :eof

:TARGET_FOLDER
echo.
echo !W!Current Target: !ROOT!!N!
set "SHOW_DIRS="
set /p "SHOW_DIRS=Do you want to see a list of subfolders here? (Y/N): "
if /i not "!SHOW_DIRS!"=="Y" goto :SKIP_LIST
echo.
echo !B!Available Folders (ignoring compilerignore dirs):!N!
for /f "delims=" %%D in ('dir /ad /b "!ROOT!" 2^>nul ^| findstr /v /i /c:"node_modules" /c:".git" /c:"build" /c:"backups"') do (
    echo   - %%D
)
echo.

:SKIP_LIST
set "TARG="
set /p "TARG=Enter folder name to go deeper (or press Enter to run checks here): "
if "!TARG!"=="" goto :LOCK_TARGET

if exist "!ROOT!!TARG!\" (
    set "ROOT=!ROOT!!TARG!\"
    goto :TARGET_FOLDER
) else (
    echo !R!Folder "!TARG!" not found! Please try again.!N!
    goto :TARGET_FOLDER
)

:LOCK_TARGET
echo !G!Locked in Target: !ROOT!!N!
call :RAM_ALLOCATION
goto :PHASE_1

:SMART_EXEC
call :DEPENDENCY_CHECK
set "RUN_CMD="
set /p "RUN_CMD=Enter your run command (e.g. npm start, python main.py): "
if "!RUN_CMD!"=="" goto :MAIN_MENU

:: --- Smart Mind Engine ---
echo !RUN_CMD! | findstr /i "^npm ^node ^npx" >nul
if !ERRORLEVEL! EQU 0 (
    if "!HAS_NODE!"=="0" echo !R![WARNING] You are trying to run a Node project, but Node.js is not installed/detected in PATH!!N!
)
echo !RUN_CMD! | findstr /i "^python ^py" >nul
if !ERRORLEVEL! EQU 0 (
    if "!HAS_PY!"=="0" echo !R![WARNING] You are trying to run Python, but Python is not installed/detected in PATH!!N!
)
:: -------------------------

echo !B!Executing: !RUN_CMD!!N!
!RUN_CMD!
if !ERRORLEVEL! NEQ 0 (
    echo !R![CRASH] The process crashed or ran out of memory. Graceful exit.!N!
    pause
)
goto :MAIN_MENU

:BACKUP_SYS
echo !B![BACKUP] Checking Disk Space...
> "%TEMP%\ac_disk.ps1" echo if ((Get-Volume -DriveLetter C).SizeRemaining -lt 500MB) { exit 1 } else { exit 0 }
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_disk.ps1"
if !ERRORLEVEL! NEQ 0 (
    echo !R!Not enough ROM/Disk Space for backup! Aborting.!N!
    del "%TEMP%\ac_disk.ps1" 2>nul
    pause
    goto :MAIN_MENU
)
del "%TEMP%\ac_disk.ps1" 2>nul

echo !G!Space OK. Preparing secure backup (ignoring node_modules/build)...!N!
if not exist "backups" mkdir "backups"
set "B_TEMP=%TEMP%\ac_backup_!RANDOM!"
mkdir "!B_TEMP!"
:: Robocopy mirrors the folder to a safe temp dir while ignoring heavy folders, then PS zips it!
robocopy "%ROOT:~0,-1%" "!B_TEMP!" /MIR /XD node_modules build backups .git >nul 2>nul
> "%TEMP%\ac_zip.ps1" echo Compress-Archive -Path '!B_TEMP!\*' -DestinationPath 'backups\backup_!RANDOM!.zip' -Force
powershell -NoProfile -ExecutionPolicy Bypass -File "%TEMP%\ac_zip.ps1"
del "%TEMP%\ac_zip.ps1" 2>nul
rd /s /q "!B_TEMP!" 2>nul
echo !G!Backup Complete and Saved to backups\ folder!!N!
pause
goto :MAIN_MENU

:DEPENDENCY_CHECK
echo !B![CHECK] Auto-Detecting Dependencies...!N!
if exist "package.json" (
    echo   !G!Node.js project detected.!N!
    if not exist "node_modules\" (
        echo   !R![WARNING] node_modules folder is missing! Your syntax checks and runs may crash. Please run 'npm install'.!N!
    ) else (
        echo   !G!node_modules found. Dependencies are ready.!N!
    )
)
if exist "requirements.txt" echo   !G!Python project detected.!N!
if exist "wrangler.toml" echo   !G!Cloudflare Worker detected.!N!
echo.
goto :eof