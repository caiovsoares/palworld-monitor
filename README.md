# Palworld Monitor
Uma ferramenta para ajudar a monitorar o seu servidor de Palworld, mostrando os players online, suas posições e níveis e permitindo que o servidor seja ligado, desligado ou reiniciado.
## Visualização
![Imagem exemplo da Homepage](https://raw.githubusercontent.com/caiovsoares/palworld-monitor/refs/heads/main/images/img1.png)
![Imagem exemplo de Login](https://raw.githubusercontent.com/caiovsoares/palworld-monitor/refs/heads/main/images/img2.png)

## Como utilizar
### Configuração rápida
- Faça um clone desse repositório
```bash
git clone https://github.com/caiovsoares/palworld-monitor.git
```
- Duplique o arquivo '.env.example' e renomeie para '.env.local' e configure as variáveis de ambiente (veja a explicação de como usar cada variável abaixo)
- Inicie o servidor como Dev
```bash
npm run dev
```
- Acesse no seu navegador
```bash
http://localhost:3333
```

## Variáveis de Ambiente
```.env
#A senha de Administrador do servidor necessária para acessar a API
ADMINPW=
#A senha utilizada para acessar o site no navegador
PASSWORD=
#A URL usada para acessar a API, normalmente o IP do servidor na porta 8212. Ex:http://127.0.0.1:8212
PALWORLD_API_URL=
#A URL usada para acessar o site no navegador
NEXT_PUBLIC_HOST=
#A URL usada pelo Next-Auth, normalmente a mesma usada em NEXT_PUBLIC_HOST
NEXTAUTH_URL=
#É um Hash SHA usado pelo Next-Auth para encriptar dados, você pode criar um bom hash usando este comando da biblioteca openssl "openssl rand -base64 32" ou usar outra de sua escolha
NEXTAUTH_SECRET=
#Comando usado para iniciar o servidor
START_SERVER_COMMAND="docker start palworld"
#Comando usado para parar o servidor
STOP_SERVER_COMMAND="docker stop palworld"
#Comando usado para reiniciar o servidor
RESTART_SERVER_COMMAND="docker restart palworld"
#Nome do servidor
SERVER_NAME=
```
