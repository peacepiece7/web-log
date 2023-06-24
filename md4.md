# MongoDB 란

MongoDB는 NoSQL multi-cloud database입니다.

RDBMS와 달리 스키마의 구조를 유연하게 가져갈 수 있기 때문에 **데이터의 복잡성이 낮습니다.**

또한 분산 저장을 지원하기 때문에 **수평적인 확장이 가능**합니다.

RDBMS처럼 장비를 바꾸거나 테이블 구조를 변경해야하는 번거로움이 없습니다.

RDBMS 구조를 비교한 아래 표를 참고해주세요.

| RDBMS    |   MONGODB  |
| -------- | ---------: |
| database |  database  |
| table    | collection |
| row      |  document  |
| coulumn  |     field  |
| PK       |      \_id  |

## mongoDB 시작하기

1. [mongodb 사이트 접속](https://www.mongodb.com/) 후 계정 생성을 생성합니다.
2. `new project`를 클릭합니다.
3. `build a database`클릭 후 공부용이라면 free shared로 만들어 주세요.
4. user id, password를 입력하세요.
5. access ip를 0.0.0.0/0 으로 변경하시거나, 본인이 접속을 허용할 ip를 입력해주세요. (기본적으로 현제 접속 ip가 할당됩니다.)

생성이 완료되셨다면 아래와 같은 화면이 나옵니다.
![클러스터 생성 완료](https://peacepiece7.github.io/blog-static-assets/mongodb_start/3.PNG, 'large')


### MongoDBCompass에 MongoDB 연결하기

1. [MongoDBCompass](https://www.mongodb.com/try/download/compass)를 다운로드 받습니다.

2. MongoDB에서 connect -> compass를 클릭하면 클러스터와 연결할 수 있는 주소가 나옵니다.

[MongoDBCompass new connection](https://peacepiece7.github.io/blog-static-assets/mongodb_start/4.PNG)

3. MongoDBCompass를 실행하고 New Connection을 클릭하여 mogodb cluster와 연결합니다.

[MongoDBCompass new connection](https://peacepiece7.github.io/blog-static-assets/mongodb_start/1.PNG)

## 서버 어플리케이션에 MongoDB 연결 

`Node.js`의 `Express`, `mongoose`를 사용해서 연결하겠습니다.

### mongoose란

[Mongoose](https://mongoosejs.com/docs/index.html)는 MongoDB를 위한 Node.js의 ODM(Object Data Modeling)입니다.

**유효성 검사**를 제공하고 **쿼리를 지원**합니다.

Schema를 지정해서 model을 생성하여 사용합니다.

### mongoose를 사용해서 MongoDB 연결하기

```js
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@cluster0.od0uwcb.mongodb.net/?retryWrites=true&w=majority`)
  .then((res) => {
    console.log("MongoDB Connected")
  })

app.use('/test', (req, res) => {
  res.json({ hi: 'foo' })
})

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})
```

## mongoose를 사용해서 CRUD하기

### Create (add)

Schema가 MongoDB에 없다면 새로운 Schema를 생성하고. (Create)

이미 존제한다면 추가합니다 (Add)

```js
app.use('/add', (req, res, next) => {
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      age: {
        type: Number,
        require: true,
      },
      kind: {
        type: String,
        default: 'human',
      },
    })
    const User = mongoose.model('Users', userSchema)
    const user = new User({
      name: 'hector',
      age: 120,
    })
    // 1. 클레스에서 제공하는 Static 메소드를 사용해서 추가합니다.
    const response = User.create(user)
    // 2. 인스턴스에서 제공하는 메서드를 사용해서 추가합니다.
    user.save()
})
```

# Read

```js
app.use('/read', async (req, res, next) => {
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      age: {
        type: Number,
        require: true,
      },
      kind: {
        type: String,
        default: 'human',
      },
    })
    const User = mongoose.model('Users', userSchema)

    // 1. Find all
    const users = await User.find() 

    // 2. Find By Id
    const user = await User.findById(req.query.id)
})
```

### Update & Delete

```js
app.use('/update', async (req, res, next) => {
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      age: {
        type: Number,
        require: true,
      },
      kind: {
        type: String,
        default: 'human',
      },
    })
    const User = mongoose.model('Users', userSchema)
    
    // update
  await User.updateOne({ name: 'foo' }, { age: 220 })

    // delete
  await User.findByIdAndDelete(req.query.id)

    res.json({ success: true})
  } catch (err) {
    console.error(err)
    res.json({})
})
```