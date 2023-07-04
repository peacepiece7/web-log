Fast campus 숨막조가 같이 프로젝트를 진행하기 위해 서버를 설치하고 포트를 여는 과정까지를 작성했습니다.

운영체제는 ubuntu 22.04-and64, Node.js는 14버전을 설치했습니다.

# AWS EC2 인스턴스 생성

1. EC2로 인스턴스 생성
2. 인바운드 규칙에 SSH, HTTP, HTTPS 허용
3. key pair 생성

# SSH 접속

> SSH에 대해서 모르는 경우 참고해 주세요
> > 다른 사람의 컴퓨터(서버)에 접속하기 위해서 사용하는 대표적인 프로그램으로 
> > 구글 원격 데스크톱이나 윈도우의 원격 연결, anyDesk, teamViewer 같은 프로그램이 있습니다.
> > 하지만 이런 프로그램은 보안 측면에서 이슈가 있습니다.
> > 누가 컴퓨터를 훔쳐서 접속하거나, 아이디를 해킹해서 접속할 수도 있습니다.
> > 이런 위험을 막을 수 있는 보안 규칙이 SSH(Secure SHell)입니다.
> > 이 SSH를 지킨 프로그램을 사용하면 보안 이슈가 극히 적은 환경에서 원격 접속을 할 수 있습니다.
> > 다시 돌아와서 SSH를 정의하면 SSH란 Secure SHell의 약자로 **다른 컴퓨터에 원격 연결하기 위한 보안 프로토콜(규약)**입니다.
> > 우리가 네이버에 로그인할 때 아이디, 비밀번호를 입력하는 것처럼 
> > **SSH에서는 비밀번호를 .pem이라는 파일로 관리**합니다.
> > 맥에는 이미 SSH 규약(프로토콜)을 지킨 프로그램이 터미널에 설치되어 있기 때문에 ssh 명령어를 실행하면 됩니다.
> > window에서는 주로 putty라는 프로그램을 사용합니다.


```bash
cd ~
ssh -i ~/test.pem ubunto@123.123.123.123
```


# Node.js 설치

PPA, api-get, nvm중 선택해서 설치한다.


## PPA를 이용한 설치

PPA를 이용해 설치하면 우분투 패키지 저장소에 들어있는 Node.js 보다 더 많은 버전을 이용할 수 있다.


```bash
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh
sudo apt-get install nodejs

sudo apt-get install build-essential
```

## apt로 설치
```bash
sudo apt-get install -y curl
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
```

## NVM (Node Version Manager)로 설치 

```bash
sudo apt-get install -y curl
sudo apt update
cd ~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source ~/.bashrc
nvm list-remote
nvm install v18.15.0
node -v
```

**sudo node 먹히지 않을 때 (nvm)**

nvm으로 nodejs를 설치 시 node 경로가 /usr/bin에 위치하지 않아서 생기는 문제이다.

```bash
which node
/home/ubuntu/.nvm/versions/node/v18.15.0/bin/node

sudo ln -s /home/ubuntu/.nvm/versions/node/v18.15.0/bin/node /usr/bin/node
```

마찬가지로 sudo npm도 에러가 날 것인데 아래와 같이 작성해준다.
```bash
which npm
/home/ubuntu/.nvm/versions/node/v18.15.0/lib/node_modules/npm

sudo ln -s /home/ubuntu/.nvm/versions/node/v18.15.0/lib/node_modules/npm /usr/bin/npm
```
# NPM 업데이트

```bash
sudo 
npm install -g npm@latest
npm -v
```

# Git 설치

```bash
sudo apt-get install git
git -v
```
# firewall 설정

```bash
sudo ufw app list
sudo ufw allow 443 
sudo ufw allow 80
sudo ufw allow 22 
sudo ufw enable
sudo ufw status
```

> ufw enable 후 ssh 접속이 안 될 때 (aws)
> > 인스턴스 정지 후 인스턴스 설정으로 이동해서 "사용자 데이타 편집"에 리부팅할 때, ufw disable 시키는 코드를 추가합니다
> > 인스턴스를 다시 시작합니다.
> > sudo ufw allow 22

# Apache


## 설치 및 실행

```bash
# 아파치를 설치합니다.
sudo apt-get install apache2

# 실행해봅시다
sudo systemctl start apache2

# 잘 실행이 되고 있는지 확인해 봅시다.
sudo ps aux | grep apache2
```

아이피 주소를 확인하고 브라우저에서 접속에서 확인

```bash
curl -4 icanhazip.com

123.123.123.123 
```

## Reverse proxy

[\[Infra\ 리버스 프록시(reverse proxy) 서버 개념](https://losskatsu.github.io/it-infra/reverse-proxy/#3-%EB%A6%AC%EB%B2%84%EC%8A%A4-%ED%94%84%EB%A1%9D%EC%8B%9Creverse-proxy-%EC%84%9C%EB%B2%84%EB%9E%80)을 참고

proxy 기능을 쓸 수 있게 프록시 모듈을 활성화한다.
```bash
sudo a2enmod proxy_http
```
가상 호스트를 설정한다.

```bash
vi /etc/apache2/site-enables/000-default.conf
```

 ```bash
# etc/apache2/site-enables/000-default.conf
<VirtualHost *:80>
  ProxyPreserveHost On
  ProxyRequests Off
	# 서버 이름을 작성 
	# 도메인이 있다면 naver.com 이런 걸 적어도 되고 도메인이 없다면 123.123.123.123 이렇게 생긴 자신의 IP를 작성
  ServerName 123.123.123.123
	# nodejs summak프로젝트는 localhost:6060에서 실행된다.
	# localhost는 = 127.0.0.1이라는 IP주소와 같다.
	# 즉 브라우저 주소창에 123.123.123.123을 치면 localhost:6060이 나온다.
  ProxyPass / http://127.0.0.1:6060/
  ProxyPassReverse / http://127.0.0.1:6060/

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
# rest of the file...
 ```



# 참고

[우분투 Node.js 설치및 npm 환경구축](https://velog.io/@ywoosang/Node.js-%EC%84%A4%EC%B9%98)

[SSH 명칭부터 접속까지 한 번에 이해하기 1](https://library.gabia.com/contents/infrahosting/9002/)

[\[Linux\] 우분투 Git 설치 / 다운로드 & 사용 방법](https://coding-factory.tistory.com/502)

[\[Infra\ 리버스 프록시(reverse proxy) 서버 개념](https://losskatsu.github.io/it-infra/reverse-proxy/#3-%EB%A6%AC%EB%B2%84%EC%8A%A4-%ED%94%84%EB%A1%9D%EC%8B%9Creverse-proxy-%EC%84%9C%EB%B2%84%EB%9E%80)

[Can’t access SSH after enable UFW in EC2 AWS? — Koffee With Kode](https://medium.com/@manprajapat/cant-access-ssh-after-enable-ufw-in-ec2-aws-koffee-with-kode-5e481a5631c6)