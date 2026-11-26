# omp-clearscreen

Press `Ctrl+L` in [omp](https://github.com/can1357/oh-my-pi) to clear the screen, just like you would in your everyday Bash terminal. The messages move up into the terminal's scrollback, where you can still scroll back to them.

The session and the model's context are kept. This is not related to omp's own `/clear`, which drops the context.

## Install

```sh
omp plugin install npm:@webdavis/omp-clearscreen
```

Restart omp after the install.

omp binds `Ctrl+L` to live voice mode, and this extension takes the key first. To keep live voice, [choose another key](#choose-the-key) for clearing, or give live voice another key in `~/.omp/agent/keybindings.yml`:

```yaml
app.live.toggle: "alt+'"
```

## Use

Press `Ctrl+L`, or run `/clearscreen`.

While a response is running, the extension shows a warning and clears nothing.

## Choose the key

`Ctrl+L` is the default. To clear the screen with another key, set it and restart omp:

```sh
omp plugin config set @webdavis/omp-clearscreen key alt+k
```

Name the key the way omp's `keybindings.yml` does, such as `alt+k` or `ctrl+shift+k`, with its modifiers in the order `ctrl`, `alt`, `shift`, `super`. A name omp does not know clears nothing. `/clearscreen` works whichever key is set.

## Limits

- The extension needs omp 19.2 or later.
- The key clears the screen only while the prompt has the keyboard.

## Develop

```sh
bun install
bun test           # the fast tests, which load nothing from omp
bun run test:all   # also the tests that run omp's own code
bun run check      # typecheck
bun run format     # format with Prettier
```

The idea comes from [pi-clear-hotkey](https://pi.dev/packages/@jetserge/pi-clear-hotkey) for Pi.
