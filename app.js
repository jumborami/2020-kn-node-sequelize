const express= require('express');
const path = require('path');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


const sequelize = new Sequelize({ //create pool
  host: 'localhost',
  port: 3306,
  database: 'boraming',
  username: 'boraming',
  password: '000000',
  dialect: 'mysql', //어떤 db 를 쓸 것인지 등록.  시퀄라이즈는 요 문장으로 다양한 db 에 접근 가능
  pool: { max: 10 }
});


 //인자 모델명, 속성, 옵션
const Sample = sequelize.define('Sample', {
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  writer: {
    type: DataTypes.STRING(20)
  },
  comment: {
    type: DataTypes.TEXT()
  }
}, {
  charset: 'utf8',
  tableName: 'seq-sample'
}); 

sequelize.sync();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello Sequelize</h1>');
});

app.get('/create', async (req, res, next) => {
  try {
    let result = await Sample.create({ // /create 로 요청 들어오면 데이터 입력
      title: '구운몽전',
      writer: '운몽이',
      comment: '한여름 나비가...'
    });
    res.json(result);
  }
  catch (e) {
    console.log(e);
  }
});

app.get('/list', async (req, res, next) => {
  try {
    let result = await Sample.findAll({ // /list로 요청 들어오면 데이터 모두 가져오기
      order: [['id', 'desc']],
      offset: 0, //0번부터
      limit: 5 //5개 가져오기 //보통 sql문이라면? limit: (0, 5) 라고 씀
    });
    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
})

