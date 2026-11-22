# omp-clear-screen

Press `Ctrl+L` in [omp](https://github.com/can1357/oh-my-pi) to clear the screen and the terminal scrollback, just like you would in your everyday Bash terminal.

The session and the model's context are kept. This is not related to omp's own `/clear`, which drops the context.

## Install

```sh
omp plugin install npm:omp-clear-screen
```

Restart omp after the install.

omp binds `Ctrl+L` to live voice mode, and this extension takes the key first. To keep live voice, [choose another key](#choose-the-key) for clearing, or give live voice another key in `~/.omp/agent/keybindings.yml`:

```yaml
app.live.toggle: "alt+'"
```

## Use

Press `Ctrl+L`, or run `/clear-screen`.

While a response is running, the extension shows a warning and clears nothing.

## Choose the key

`Ctrl+L` is the default. To clear the screen with another key, set it and restart omp:

```sh
omp plugin config set omp-clear-screen key alt+k
```

Name the key the way omp's `keybindings.yml` does, such as `alt+k` or `ctrl+shift+k`. A name omp does not know clears nothing. `/clear-screen` works whichever key is set.

## Limits

- Cleared messages do not return to the screen in that view of the session. They stay in the session file and in the model's context.
- The extension finds omp's transcript by a method name that is internal to omp. If an omp update renames that method, the extension shows an error and clears nothing. It is tested with omp 19.1.0.

## Develop

```sh
bun install
bun test           # the fast tests, which load nothing from omp
bun run test:all   # also the tests that run omp's own code
bun run check      # typecheck
bun run format     # format with Prettier
```

The idea comes from [pi-clear-hotkey](https://pi.dev/packages/@jetserge/pi-clear-hotkey) for Pi.
