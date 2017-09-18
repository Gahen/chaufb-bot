# Bye bye facebook

## ¿Qué hace?

Un bot de facebook que se loguea con tu usuario y le avisa a cualquiera que te mensajee que te fuiste de ese antro y en donde te pueden ubicar ahora. El mensaje se puede personalizar fácilmente con unas pocas variables. Por ahora solo está en español

## ¿Es peligroso usarlo?

Es muy probable que facebook bloquee el acceso de now.sh a tu cuenta y tu cuenta, en mi caso solo me mostraba una pantalla para que ponga "sí fui yo el que accedió" y nada más, pero revisar la configuración de seguridad de antemano no es una mala idea. Tampoco tener una sesión activa de fb cuando se está probando el bot.

Lo armé configurado para usar now.sh, es necesario subir tus credenciales de fb como secreto ahí para que funcione pero mucha gente está usándolo para cosas serias, así que no debería haber problema.

Dicho esto, no me hago cargo de cualquier cosa mala que pueda pasar y están todos invitados a revisar el código fuente para encontrar problemas. Es bien cortito.

## How To

### Download the code

```
git clone https://github.com/Gahen/chaufb-bot.git
cd chaufb-bot
```

### Install now.sh and Typescript compiler

```
npm install -g now typescript
```

### Add your fb account credentials to now.sh secrets

```
now secrets add fb-email "email@sarasa.com"
now secrets add fb-pass "SuperSecurePassword"
```

### Copy and edit messages file (right now only in spanish =))

```
cp messages.dev.ts messages.ts
vim messages.ts # complete it with your public contact data
```

### Deploy 

`npm run now`

If you deploy just with `now` it would not get the credentials that you configured before, check `package.json` for more info.

If you have any problem go to [Troubleshooting]

### Kill the bot

If you need to kill the bot you can do it with `now rm`

```
$ now ls
chaufb-bot-asdjkhasdkl.now.sh              0    DEPLOYING              8s
$ now rm chaufb-bot-asdjkhasdkl.now.sh
> The following deployment will be removed permanently:
Y6dwfGWOt8fvQy5bEFG2DxIo      https://chaufb-bot-asdjkhasdkl.now.sh      2m ago
> Are you sure? [y/N] y
> Success! [2s]
Deployment Y6dwfGWOt8fvQy5bEFG2DxIo removed
```

## Troubleshooting

You'll probably need to try a few times until facebook stops blocking your account
