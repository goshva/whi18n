## Getting Started
### Clone the repository
```bash
$ git clone https://github.com/goshva/whi18n.git
```

### Change directory
```bash
$ cd whi18n
```

### Install dependencies
```bash
$ npm install
```

### Run the application
```bash
$ npm run serve
```
### /etc/hosts
```bash
127.0.0.1      whi18n
```
## nginx conf
```bash
upstream dev-wh {
    server 127.0.0.1:8080;
    keepalive 16;
}

server {
    server_name whi18n;
    root /home/goshva/vue/whi18n;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://dev-wh;
        proxy_redirect off;
    }
    location /v2 {
        proxy_set_header Host test.whteam.net;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://test.whteam.net/v2;
        proxy_redirect default;
    }    
}
```

## Built With

* [Vue.js](https://vuejs.org/) - A JavaScript library for building user interfaces.
