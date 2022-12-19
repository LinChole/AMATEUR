var express = require('express')
var mysql = require('mysql');
// 新增 multer 套件
const multer = require('multer');
var app = express()
app.listen(9000);
var cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./config/token");
const bcrypt = require("bcrypt");
app.use(cors())
console.log('running');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));


var conn = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "AMATEUR",
    port: "8889",
    multipleStatements: true, //可同時執行兩個MySQL指令
    dateStrings: true

})
// 上傳圖片&音樂檔案開始分隔線 ---------- //
var userStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/img/userImage/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var channelStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/img/channelImage/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var musicImgStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/img/MusicImage/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var musicStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/Music/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var blogStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/img/blogImage/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var uploadUser = multer({
    storage: userStorage
});
var uploadChannel = multer({
    storage: channelStorage
});
var createMusicImg = multer({
    storage: musicImgStorage
});
var uploadMusic = multer({
    storage: musicStorage
});
var uploadMusic = multer({
    storage: musicStorage
});
var createBlog = multer({
    storage: blogStorage
});
var uploadBlog = multer({
    storage: blogStorage
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/MemberList.jsx');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/MemberChannel.jsx');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/NewArticle.jsx');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/EditArticle.jsx');
});

//修改指定 UserID 的頻道個人圖片
app.put("/user/image/:id", uploadUser.single('userImg'), function (req, res) {
    let UserID = req.params.id;
    let UserImage = 'http://localhost:9000/img/userImage/' + req.file.filename;
    conn.query(`UPDATE UserInfo SET UserImage = ? WHERE UserID = ?`,
        [UserImage, UserID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})

//修改指定 ChannelID 的頻道圖片
app.put("/channel/image/:id", uploadChannel.single('channelImg'), function (req, res) {
    let ChannelID = req.params.id;
    let ChannelImage = 'http://localhost:9000/img/channelImage/' + req.file.filename;
    conn.query(`UPDATE ChannelData SET ChannelImage = ? WHERE ChannelData.ChannelID = ?`,
        [ChannelImage, ChannelID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})

//新增指定 ChannelID 的音樂資料
let MusicImage = '';
app.post("/music/create/:id", createMusicImg.single('musicImg'), function (req, res) {
    let UserID = req.params.id;
    MusicImage = 'http://localhost:9000/img/MusicImage/' + req.file.filename;
    conn.query(`INSERT INTO MusicData (UserID, MusicName, Singer, Album, MusicType, MusicTime, MusicImage, MusicMp3) values (?, '1', '1', '1', '1', '1', ?, '1')`,
        [UserID, MusicImage],
        function (err, rows) {
            console.log(err);
            res.send(JSON.stringify(req.body));
        })
    return MusicImage;
})
app.put("/music/create/:id", uploadMusic.single('musicFile'), function (req, res) {
    let MusicMp3 = 'http://localhost:9000/Music/' + req.file.filename;
    console.log(MusicMp3);
    conn.query(`UPDATE MusicData SET MusicMp3 = ? WHERE MusicData.MusicImage = '${MusicImage}'`,
        [MusicMp3],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
app.put("/music/update/:id", function (req, res) {
    let arr = req.body[0];
    console.log(arr);
    conn.query(`UPDATE MusicData SET MusicName = ?, Singer = ?, Album = ?, MusicType = ?, MusicTime = ? WHERE MusicImage = '${MusicImage}'`,
        [arr.MusicName, arr.Singer, arr.Album, arr.MusicType, arr.MusicTime],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        }
    )
    return MusicImage = '';
})

//新增指定 ChannelID 的部落格資料
let BlogImage = '';
app.post("/blog/create/:id", createBlog.single('blogImg'), function (req, res) {
    let ChannelID = req.params.id;
    BlogImage = 'http://localhost:9000/img/blogImage/' + req.file.filename;
    conn.query(`INSERT INTO BlogData (ChannelID, BlogTitle, BlogText, BlogImage) values (?, '1', '1', ?)`,
        [ChannelID, BlogImage],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
    return BlogImage;
})
app.put("/blog/create/:id", function (req, res) {
    let arr = req.body[0];
    conn.query(`UPDATE BlogData SET BlogTitle = ?, BlogText = ? WHERE BlogData.BlogImage = '${BlogImage}'`,
        [arr.BlogTitle, arr.BlogText],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        }
    )
    return BlogImage = '';
})
//修改指定 BlogID 的部落格資料
app.put("/blog/image/:id", uploadBlog.single('blogImg'), function (req, res) {
    let BlogID = req.params.id;
    BlogImage = 'http://localhost:9000/img/blogImage/' + req.file.filename;
    conn.query(`UPDATE BlogData SET BlogImage = ? WHERE BlogData.BlogID = ?`,
        [BlogImage, BlogID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
app.put("/blog/items/:id", function (req, res) {
    let arr = req.body[0];
    conn.query(`UPDATE BlogData SET BlogTitle = ?, BlogText = ? WHERE BlogData.BlogID = ?`,
        [arr.BlogTitle, arr.BlogText, arr.BlogID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
// 上傳圖片&音樂檔案結束分隔線 ---------- //
app.use(express.static(__dirname + '/public'));
//http://localhost:9000/img/名字.jpeg
//http://localhost:9000/Music/稀有品種.mp3

//------------UserInfo-----------//--------
app.get("/loginUser/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT * FROM userinfo WHERE UserID = ?;`, data, function (err, result) {
        res.send(result)
    })
})
// /------------新增音樂到我的歌單------------//

//INSERT INTO MediaMusic (UserID, MusicID) VALUES ('1', '10')
app.post("/MusicList/add", function (req, res) {
    var result = req.body[0]
    console.log(result);
    conn.query(
        `INSERT INTO MediaMusic (UserID, MusicID) VALUES (?,?)`,
        [result.UserID, result.MusicID],
        function (err, rows, flows) {
            res.send(rows);
            console.log(err);
        })
})
//------------刪除音樂我的歌單音樂------------//
app.post("/MusicList/delete", function (req, res) {
    var result = req.body[0]
    console.log(result);
    conn.query(
        `DELETE FROM MediaMusic WHERE MediaMusic.UserID = ? AND MediaMusic.MusicID = ?`,
        [result.UserID, result.MusicID],
        function (err, rows) {
            res.send(rows);
            console.log(err);
        })

})
//------------取我的歌單資料------------//
app.get("/MusicList/:userID", function (req, res) {
    var data = req.params.userID
    conn.query(`SELECT MusicData.* FROM MediaMusic,MusicData WHERE MediaMusic.MusicID = MusicData.MusicID AND MediaMusic.UserID = ?;`, [data], function (err, result) {
        res.send(result)
    })
})


//------------音樂-----------//

//找出清單所有歌曲 資料
app.get("/music", function (req, res) {
    conn.query(`SELECT * FROM MusicData`, [], function (err, result) {
        res.send(result)
    })
})
//只取10筆-----
app.get("/Limitmusic", function (req, res) {
    conn.query(`SELECT * FROM musicdata ORDER BY LikeNum DESC LIMIT 10`, [], function (err, result) {
        res.send(result)
    })
})
//只取20筆----
app.get("/musicTop", function (req, res) {
    conn.query(`SELECT * FROM MusicData LIMIT 20`, [], function (err, result) {
        res.send(result)
    })
})

//取到指定的MusicID 歌曲資料
// req.params.id 由前端get(`http://localhost:3000/music/${id}`) 
app.get("/music/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT * FROM MusicData WHERE MusicID = ?;`, data, function (err, result) {
        res.send(result)
    })
})
//刪除指定 MusicID 的歌曲資料 --> 自行新增
app.delete("/music/delete/:id", function (req, res) {
    var data = [req.params.id]
    console.log(data);
    conn.query("DELETE FROM MusicData WHERE MusicID = ?", data, function (err, result) {
        res.send("#" + data + " deleted");
    })
})

//------------頻道------------//
//取所有頻道個人資料
app.get("/user/list", function (req, res) {
    conn.query("SELECT * FROM UserInfo", [], function (err, rows) {
        res.send(JSON.stringify(rows));
    })
})
//取指定 UserID 的頻道個人資料
app.get("/user/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT * FROM UserInfo WHERE UserID = ?`, data, function (err, result) {
        res.send(result)
    })
})
//取指定 userID 的頻道個人圖片
app.get("/user/image/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT UserInfo.UserImage FROM UserInfo WHERE UserInfo.UserID = ?`, data, function (err, result) {
        res.send(result)
    })
})
//修改指定 UserID 的頻道個人資料
app.put("/user", function (req, res) {
    let arr = req.body[0];
    conn.query(`UPDATE UserInfo SET UserName = ?, UserSex = ?, UserPhone = ?, UserBirth = ?, UserMail = ?, UserPW = ? WHERE UserInfo.UserID = ?;`,
        [arr.UserName, arr.UserSex, arr.UserPhone, arr.UserBirth, arr.UserMail, arr.UserPW, arr.UserID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
//取所有頻道創作者資料
app.get("/channel/list", function (req, res) {
    conn.query("SELECT * FROM ChannelData", [], function (err, rows) {
        res.send(JSON.stringify(rows));
    })
})
//取指定 userID 的頻道資料
app.get("/channel/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT ChannelData.* FROM ChannelData WHERE ChannelData.UserID = ?`, data, function (err, result) {
        res.send(result)
    })
})
//取指定 userID 的頻道圖片
app.get("/channel/image/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT ChannelData.ChannelImage FROM ChannelData WHERE ChannelData.UserID = ?`, data, function (err, result) {
        res.send(result)
    })
})
//修改指定 ChannelID 的頻道資料
app.put("/channel", function (req, res) {
    let arr = req.body[0];
    conn.query(`UPDATE ChannelData SET ChannelName = ?, ChannelDate = ?, ChannelLink = ?, ChannelIntro = ? 
    WHERE ChannelData.ChannelID = ?;`,
        [arr.ChannelName, arr.ChannelDate, arr.ChannelLink, arr.ChannelIntro, arr.ChannelID],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
//取指定 ChannelID 的頻道音樂
app.get("/channelMusic/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT MusicData.* FROM ChannelData,MusicData 
    WHERE ChannelData.UserID = MusicData.UserID 
    AND ChannelData.ChannelID = ? 
    ORDER BY MusicData.MusicUpdateTime DESC 
    LIMIT 5;`, data, function (err, result) {
        res.send(result);
    })
})
//channel CheckLike
app.get("/channelMusic/:channelID/CheckLike/:UserID", function (req, res) {
    var data = [req.params.channelID, req.params.UserID]
    conn.query(`SELECT MusicData.*,UsertrackSongData.CheckLike FROM ChannelData,MusicData,UsertrackSongData 
    WHERE ChannelData.UserID = MusicData.UserID AND musicdata.MusicID=UsertrackSongData.MusicID AND 
    ChannelData.ChannelID = ? AND UsertrackSongData.UserID =? ORDER BY MusicData.MusicUpdateTime DESC LIMIT 5;`, data, function (err, result) {
        res.send(result);
    })
})
//取頻道創作者資訊
app.get("/channelUserInfo/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT UserInfo.UserID,UserName,UserImage FROM UserInfo WHERE UserID=?`, [data], function (err, result) {
        res.send(result)
    })
})
//推薦其他創作頻道
app.get("/otherchannel/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT userinfo.UserImage,channeldata.* FROM userinfo,channeldata WHERE userinfo.UserID=channeldata.ChannelID AND ChannelID != ? ORDER BY ChannelFollow ASC LIMIT 6`, [data], function (err, result) {
        res.send(result)
    })
})

//------------專輯------------//
// 取誰的頻道音樂專輯名稱
app.get('/channel/AlbumName/:id', function (req, res) {
    var data = req.params.id
    conn.query(`SELECT DISTINCT MusicData.Album FROM ChannelData,MusicData WHERE ChannelData.UserID = MusicData.UserID AND ChannelData.ChannelID = ?;`, [data], function (err, result) {
        res.send(result)
    })
})

//取誰的頻道所有專輯資料
app.get('/channel/Album/:id', function (req, res) {
    var data = req.params.id
    conn.query(`SELECT DISTINCT AlbumData.AlbumID,AlbumData.AlbumName,AlbumData.AlbumImage,AlbumData.AlbumTime FROM AlbumData,MusicData WHERE MusicData.MusicID = AlbumData.MusicID AND MusicData.UserID = ? ORDER BY AlbumTime DESC;`, [data], function (err, result) {
        res.send(result)
    })
})
//專輯所有歌曲------
app.get('/channelMusic/:userID/AlbumMusic/:AlbumID', function (req, res) {
    var data = [req.params.userID, req.params.AlbumID]
    conn.query(`SELECT MusicData.* FROM AlbumData,MusicData WHERE
    MusicData.MusicID = AlbumData.MusicID AND
    AlbumData.AlbumID = ? AND
    MusicData.UserID = ? ;`, data, function (err, result) {
        res.send(result)
    })
})
//專輯所有歌 checkLike
app.get('/channelMusic/:userID/AlbumMusic/:AlbumID/user/:uID', function (req, res) {
    var data = [req.params.userID, req.params.AlbumID, req.params.uID]
    conn.query(`SELECT MusicData.*,UsertrackSongData.CheckLike FROM AlbumData,MusicData,UsertrackSongData 
    WHERE MusicData.MusicID = AlbumData.MusicID AND musicdata.MusicID=UsertrackSongData.MusicID AND AlbumData.AlbumID = ?
     AND MusicData.UserID = ? AND UsertrackSongData.UserID = ?;`, data, function (err, result) {
        res.send(result)
    })
})
//取誰的哪個專輯所有音樂 
//userID = ChannelID
// app.get('/channel/:userID/AlbumMusic/:AlbumID', function (req, res) {
//     var data = [req.params.userID, req.params.AlbumID]
//     conn.query(`SELECT MusicData.* FROM AlbumData,MusicData WHERE
//     MusicData.MusicID = AlbumData.MusicID AND
//     AlbumData.AlbumID = ? AND
//     MusicData.UserID = ?;`, data, function (err, result) {
//         res.send(result)
//     })
// })



//------------部落格------------//

//取所有部落格資料
app.get("/blog", function (req, res) {
    conn.query(`SELECT * FROM BlogData`, [], function (err, result) {
        res.send(result)
    })
})
//首頁部落格文章
app.get("/blogIndex", function (req, res) {
    conn.query(`SELECT * FROM BlogData ORDER BY BlogData.BlogTime DESC LIMIT 4`, [], function (err, result) {
        res.send(result)
    })
})

//取指定userID的所有部落格資料
app.get("/blog/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT BlogData.* FROM ChannelData,BlogData
    WHERE ChannelData.ChannelID = BlogData.ChannelID
    AND ChannelData.UserID = ? ORDER BY BlogData.BlogTime DESC;`, data, function (err, result) {
        res.send(result)
    })
})
//取指定部落格文章
app.get("/blog/items/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT UserInfo.UserName,UserInfo.UserImage,BlogData.* FROM UserInfo,BlogData WHERE BlogID =? AND UserInfo.UserID=BlogData.ChannelID`,
        data, function (err, result) {
            res.send(result)
        })

})

//部落格的其他文章
app.get("/channelBlog/:channelID/blog/:blogID", function (req, res) {
    var data = [req.params.channelID, req.params.blogID]
    console.log(data)
    // conn.query(`SELECT * FROM BlogData  WHERE ChannelID = ? NOT IN(BlogID = ?)`, data, function (err, result) {
    conn.query(`SELECT * FROM BlogData WHERE ChannelID = ? AND BlogID != ? ORDER BY BlogData.BlogTime DESC`, data, function (err, result) {
        res.send(result)
    })
})

//其他人的文章
app.get("/blogOtherPage/:channelID/blog/other/:blogID", function (req, res) {
    var data = [req.params.channelID, req.params.blogID]
    conn.query(`SELECT * FROM BlogData WHERE ChannelID != ? AND BlogID !=? ORDER BY BlogData.BlogTime DESC LIMIT 3`, data, function (err, result) {
        res.send(result)
    })
})
//取指定 UserID 的2筆部落格資料 --> 自行新增
app.get("/blog/limit/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT BlogData.* FROM ChannelData,BlogData 
    WHERE ChannelData.ChannelID = BlogData.ChannelID 
    AND ChannelData.UserID = ? 
    ORDER BY BlogData.BlogID DESC 
    LIMIT 2`, data, function (err, result) {
        res.send(result);
    })
})
//取指定 BlogID 的部落格圖片 --> 自行新增
app.get("/blog/image/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT BlogData.BlogImage FROM BlogData WHERE BlogData.BlogID = ?`, data, function (err, result) {
        res.send(result);
    })
})



//------------搜尋------------//

//搜尋歌手 接收form表單

// singer name
app.get("/searchSinger/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT * FROM MusicData WHERE UserID = ?;`, [data], function (err, result) {
        res.send(result)
    })
})
// singer name
app.get("/searchSinger/:id/user/:UserID", function (req, res) {
    var data = [req.params.id, req.params.UserID]
    conn.query(`SELECT musicdata.*,UsertrackSongData.CheckLike FROM musicdata,UsertrackSongData WHERE musicdata.MusicID=UsertrackSongData.MusicID AND musicdata.UserID = ?   AND UsertrackSongData.UserID = ?`, data, function (err, result) {
        res.send(result)
    })
})

//搜尋類別 

app.get("/search/:type", function (req, res) {
    var data = [req.params.type] //傳過來要是字串 像['抒情']
    conn.query(`SELECT * FROM MusicData WHERE MusicType= ?;`, data, function (err, result) {
        res.send(result)
    })
})
// song type 1-6
app.get("/search/:type/1", function (req, res) {
    var data = [req.params.type] //傳過來要是字串 像['抒情']
    conn.query(`SELECT * FROM MusicData WHERE MusicType= ? LIMIT 1,6;`, data, function (err, result) {
        res.send(result)
    })
})
// song type 7-12
app.get("/search/:type/6", function (req, res) {
    var data = [req.params.type] //傳過來要是字串 像['抒情']
    conn.query(`SELECT * FROM MusicData WHERE MusicType= ? LIMIT 7,12;`, data, function (err, result) {
        res.send(result)
    })
})

//------------取按愛心清單------------//
app.get("/checkLike/:id/user/:type", function (req, res) {
    var data = [req.params.id, req.params.type]
    conn.query(`SELECT MusicData.*,UsertrackSongData.CheckLike FROM MusicData,UsertrackSongData WHERE MusicData.MusicID=UsertrackSongData.MusicID AND UsertrackSongData.UserID = ? AND musicdata.MusicType= ?`, data, function (err, result) {
        res.send(result)
    })
})
//更新按讚愛心
app.put("/checkLikeAdd", function (req, res) {
    let data = req.body[0];
    console.log(data.CheckLike, data.MusicID);
    conn.query(`UPDATE UsertrackSongData SET CheckLike = ? WHERE UsertrackSongData.MusicID = ?;`,
        [data.CheckLike, data.MusicID], function (err, result) {
            res.send(result)
        })
})
//更新按讚歌曲數量
app.put("/likeNumAdd", function (req, res) {
    let data = req.body[0];
    console.log(data.LikeNum, data.MusicID);
    conn.query(`UPDATE musicdata SET LikeNum = ? WHERE musicdata.MusicID = ?;`,
        [data.LikeNum, data.MusicID], function (err, result) {
            res.send(result)
        })
})
//推薦TOP 20 
app.get("/likeTop20/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT musicdata.*, UsertrackSongData.CheckLike FROM musicdata, UsertrackSongData WHERE musicdata.MusicID = UsertrackSongData.MusicID AND UsertrackSongData.UserID = ? ORDER BY musicdata.LikeNum DESC LIMIT 20;`, data, function (err, result) {
        res.send(result)
    })
})
//index TOP 10 
app.get("/likeTop10/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT musicdata.*,UsertrackSongData.CheckLike FROM musicdata,UsertrackSongData WHERE musicdata.MusicID=UsertrackSongData.MusicID AND UsertrackSongData.UserID = ? ORDER BY LikeNum DESC LIMIT 10;`, data, function (err, result) {
        res.send(result)
    })
})



//------------抖內資訊 DonateData-----------//
//贊助過我的所有贊助者 --> 有修改過
//id收 取指定 ChannelID 的所有贊助者
app.get("/DonateData/:id", function (req, res) {
    var ChannelID = req.params.id
    conn.query(`SELECT DISTINCT UserInfo.UserName, DonateData.*, UserInfo.UserImage FROM DonateData,UserInfo 
    WHERE DonateData.ChannelID = ? 
    AND UserInfo.UserID = DonateData.UserID 
    ORDER BY DonateData.DonateDate DESC;`, ChannelID, function (err, result) {
        res.send(result);
    })
})
//我贊助過的所有頻道 --> 有修改過
//id收 取指定 UserID 贊助過的所有頻道
app.get("/MyDonateData/:id", function (req, res) {
    var UserID = req.params.id
    conn.query(`SELECT DISTINCT ChannelData.ChannelName, DonateData.*, UserInfo.UserImage FROM DonateData,ChannelData,UserInfo 
    WHERE DonateData.UserID = ? 
    AND ChannelData.ChannelID = DonateData.ChannelID 
    AND ChannelData.UserID = UserInfo.UserID 
    ORDER BY DonateData.DonateDate DESC;`, UserID, function (err, result) {
        res.send(result);
    })
})
//新增贊助
app.post("/create/donate", function (req, res) {
    var result = req.body[0];
    console.log(result)
    conn.query(`INSERT INTO DonateData (ChannelID, UserID, DonateMoney, DonateDate) VALUES( ?, ?, ?, ?);`, [result.ChannelID, result.UserID, result.money, result.Donate], function (err, result) {
        res.send(result)
        console.log(err)
    })
})

//------------信用卡資料表 CreditCardData------------//
//取指定 UserID 的信用卡資料 --> 有修改過
app.get("/CreditCardData/:id", function (req, res) {
    var UserID = req.params.id
    conn.query(`SELECT * FROM CreditCardData WHERE UserID = ?;`, UserID, function (err, result) {
        res.send(result);
    })
})

//------------銀行帳戶資料表 BankData------------//
//取指定 UserID 的銀行帳戶資料 --> 有修改過
app.get("/BankData/:id", function (req, res) {
    var UserID = req.params.id
    conn.query(`SELECT * FROM BankData WHERE UserID = ?;`, UserID, function (err, result) {
        res.send(result);
    })
})

//------------票卷資料表 TicketData------------//
//取所有票卷資料 --> 自行新增
app.get("/TicketData", function (req, res) {
    conn.query(`SELECT * FROM TicketData`, [], function (err, result) {
        res.send(result);
    })
})
//取所有票卷資料 --> 自行新增
app.get("/TicketData/:id", function (req, res) {
    let TicketID = req.params.id;
    conn.query(`SELECT * FROM TicketData WHERE TicketID = ?`, TicketID, function (err, result) {
        res.send(result);
    })
})
//取指定 UserID 的票卷資料 --> 有修改過
app.get("/MyTicketData/:id", function (req, res) {
    let UserID = req.params.id;
    conn.query(`SELECT DISTINCT UserTicketData.*, TicketData.TicketDate, TicketData.TicketLocation, TicketData.TicketSeat FROM UserInfo, TicketData, UserTicketData 
    WHERE UserInfo.UserID = UserTicketData.UserID 
    AND TicketData.TicketID = UserTicketData.TicketID 
    AND UserInfo.UserID = ?`, UserID, function (err, result) {
        res.send(result);
    })
})
//新增指定 UserID 的票卷資料 --> 有修改過
app.post("/MyTicketData/create/:id", function (req, res) {
    let UserID = req.params.id;
    let arr = req.body[0]
    conn.query(`INSERT INTO UserTicketData (UserID, TicketID, myTicketCount, myTicketTotal) VALUES (?, ?, ?, ?);`,
        [UserID, arr.TicketID, arr.TicketCount, arr.TicketTotal],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
//修改指定 UserID 的購票確認欄位 --> 自行新增
app.put("/user/:id", function (req, res) {
    let UserID = req.params.id;
    let data = req.body.checkTicket;
    console.log(data);
    conn.query(`UPDATE UserInfo SET CheckTicket = ? WHERE UserID = ?;`,
        [data, UserID], function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})

//------------頻道留言------------//
//取指定 ChannelID 的所有留言資料 --> 有修改過
app.get("/message/:id", function (req, res) {
    var id = req.params.id
    conn.query(`SELECT MessageData.*, UserInfo.UserImage, BlogData.BlogTitle FROM ChannelData,BlogData,MessageData,UserInfo 
    WHERE ChannelData.ChannelID = BlogData.ChannelID 
    AND BlogData.BlogID = MessageData.BlogID 
    AND ChannelData.ChannelID = ? 
    AND UserInfo.UserID = MessageData.UserID 
    ORDER BY MessageData.MessageDate DESC 
    LIMIT 3;`, id, function (err, result) {
        res.send(result);
    })
})
//取指定 MessageID 的留言資料 --> 自行新增
app.get("/message/items/:id", function (req, res) {
    var data = [req.params.id]
    conn.query(`SELECT * FROM MessageData WHERE MessageData.MessageID = ?;`, data, function (err, result) {
        res.send(result);
    })
})
//修改指定 MessageID 的留言資料 --> 自行新增
app.put("/message/items", function (req, res) {
    let arr = req.body;
    console.log(arr);
    conn.query(`UPDATE MessageData SET MessageReply = ? WHERE MessageData.MessageID = ?;`,
        [arr.MessageReply, arr.MessageID], function (err, rows) {
            res.send(JSON.stringify(req.body));
        })
})
//message 取哪一個部落格的留言
app.get("/channel/:channelID/blog/:blogID/message", function (req, res) {
    var data = [req.params.channelID, req.params.blogID]
    conn.query(`SELECT MessageData.*,UserInfo.UserImage FROM ChannelData,BlogData,MessageData,UserInfo WHERE ChannelData.ChannelID = BlogData.ChannelID AND BlogData.BlogID = MessageData.BlogID AND ChannelData.ChannelID = ? AND MessageData.BlogID = ? AND UserInfo.UserID = MessageData.UserID ORDER BY MessageData.MessageDate DESC;`, data, function (err, result) {
        res.send(result)
    })
})
//新增留言
app.post("/message/create", function (req, res) {
    var result = req.body[0]
    console.log(result);
    conn.query(
        `INSERT INTO MessageData (BlogID,UserID,MessageName, MessageText) VALUES (?, ?, ?,?)`,
        [result.BlogID, result.UserID, result.MessageName, result.MessageText],
        function (err, rows, flows) {
            res.send(rows);
            console.log(err);
        })
})

//------------追蹤清單------------//
//取指定 UserID 追蹤的所有頻道資料 --> 有修改過
app.get("/trackList/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT ChannelData.*, UserInfo.UserImage FROM ChannelData,TrackListData,UserInfo 
    WHERE ChannelData.ChannelID = TrackListData.ChannelID 
    AND TrackListData.UserID= ? 
    AND UserInfo.UserID = ChannelData.ChannelID;` , data, function (err, result) {
        res.send(result);
    })
})
//User追蹤判斷
app.get("/trackListCheck/:id", function (req, res) {
    var data = req.params.id
    conn.query(`SELECT * FROM TrackListData WHERE UserID = ? ;`, [data], function (err, result) {
        res.send(result)
    })
})

app.get("/tracklistdata/:UserId/:ChanelId", function (req, res) {
    var x = req.params.UserId;
    var y = req.params.ChanelId;
    var z = `SELECT * FROM tracklistdata WHERE UserID = ${x} AND ChannelID = ${y}`;
    conn.query(z, (err, result) => {
        console.log(result)
        res.send(result);
    })
})
//沒有資料就新增追蹤
app.post("/trackAdd", function (req, res) {
    var result = req.body[0]
    console.log(result)
    conn.query(`INSERT INTO TrackListData (UserID, ChannelID) VALUES (?, ?);`,
        [result.UserID, result.ChannelID], function (err, rows, flows) {
            res.send(err)
            // console.log(rows)

        })
})
//有資料就刪除追蹤
app.delete("/trackDelete/:ChannelID", function (req, res) {
    var data = req.params.ChannelID
    // console.log("test", data)
    conn.query(`DELETE FROM TrackListData WHERE TrackListData.UserID = 1 AND TrackListData.ChannelID = ?`,
        [data], function (err, result) {
            res.send(result);
        })
})
//更新追蹤數字
app.post("/followUpdate", function (req, res) {
    var result = req.body[0]
    // console.log(result);
    // console.log("update", result)
    conn.query(`UPDATE channeldata SET ChannelFollow = ? WHERE channeldata.ChannelID = ? `,
        [result.ChannelFollow, result.ChannelID], function (err, result) {
            res.send(err);
            console.log(err)
        })
})

//------------取我的歌單資料------------//
app.get("/MusicList/:userID", function (req, res) {
    var data = req.params.userID
    conn.query(`SELECT MusicData.* FROM MediaMusic,MusicData WHERE MediaMusic.MusicID = MusicData.MusicID AND MediaMusic.UserID = ?;`, [data], function (err, result) {
        res.send(result)
    })
})
//------------新增音樂到我的歌單------------//

//INSERT INTO MediaMusic (UserID, MusicID) VALUES ('1', '10')
app.post("/MusicList/add", function (req, res) {
    var result = req.body[0]
    console.log(result);
    conn.query(
        `INSERT INTO MediaMusic (UserID, MusicID) VALUES (?,?)`,
        [result.UserID, result.MusicID],
        function (err, rows, flows) {
            res.send(rows);
            console.log(err);
        })
})
//------------刪除音樂我的歌單音樂------------//
app.post("/MusicList/delete", function (req, res) {
    var result = req.body[0]
    console.log(result);
    conn.query(
        `DELETE FROM MediaMusic WHERE MediaMusic.UserID = ? AND MediaMusic.MusicID = ?`,
        [result.UserID, result.MusicID],
        function (err, rows) {
            res.send(rows);
            console.log(err);
        })

})

//登入註冊
app.post("/signin", function (req, res) {
    const { UserMail, UserPW } = req.body;
    let x = bcrypt.hashSync(UserPW, 10);
    conn.query(
        `SELECT * FROM userinfo WHERE UserMail='${UserMail}'`,
        (err, rows, fields) => {
            if (rows.length === 0) {
                return res.send({ error: 'ACCOUNT_NOT_EXIST' });
            };
            const psRes = bcrypt.compareSync(UserPW, rows[0].UserPW);

            if (!psRes) {
                res.send({ error: "WRONG_PASSWORD" });
            } else {
                const payload = {
                    id: rows[0].id,
                    UserMail: rows[0].UserMail,
                };
                const token = jwt.sign(payload, config.jwtKey, { expiresIn: '24h' });
                return res.send([rows, token]);
            }

        }
    );
});
app.post("/signup", function (req, res) {
    var { UserMail, UserPW, UserName, UserBirth } = req.body;
    UserPW = bcrypt.hashSync(UserPW, 10);
    console.log(req.body);
    conn.query(
        `INSERT INTO userinfo ( UserMail, UserPW, UserName, UserSex, UserPhone, UserBirth)  VALUES ( '${UserMail}', '${UserPW}', '${UserName}', '', 'NULL', '${UserBirth}')`,
        function (err, rows, fields) {
            if (rows) {
                return res.send({ message: "REGISTER_SUCCESSFULLY" });
            };
            return res.send({ error: "ACCOUNT_ALREADY_EXISTS" });
        });
});
app.get('/contest/groupid0', function (req, res) {
    let sql = 'SELECT * FROM contestdata WHERE ContestGroupID = 0';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

app.get('/contest/groupid0/result', function (req, res) {
    let sql = 'SELECT * FROM contestdata WHERE ContestGroupID = 0 ORDER BY ContestVote DESC LIMIT 0,5';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})
app.get('/contest/groupid1', function (req, res) {
    let sql = 'SELECT * FROM contestdata WHERE ContestGroupID = 1';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})
app.get('/contest/groupid1/result', function (req, res) {
    let sql = 'SELECT * FROM contestdata WHERE ContestGroupID = 1 ORDER BY ContestVote DESC LIMIT 0,5';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})
app.get('/contest/:id', function (req, res) {
    let id = req.params.id
    let sql = `SELECT * FROM contestdata WHERE ContestID = ${id}`;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})
app.post('/contestvote',
    (req, res) => {
        let { ContestVote, ContestId } = req.body;
        let x = parseInt(req.body.ContestVote) + 1;
        let y = req.body.ContestID;
        let sql = `UPDATE contestdata SET ContestVote = ${x} WHERE contestdata.ContestId= ${y}`;
        conn.query(sql, (err, result) => {
            console.log(err);
        })
    }
)



//SELECT MusicData.* FROM NewMediaMusic,MusicData WHERE NewMediaMusic.MusicID = MusicData.MusicID AND NewMediaMusic.UserID = 2;
