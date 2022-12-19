import React, { Component } from 'react';
import Axios from 'axios';

import { NavLink } from 'react-router-dom';

class ConcertContent extends Component {
  state = {
    ticketList: [{}]
  }
  render() {
    return (
      <section className="container pt-md-20">
        <h1 className="fs-2 fw-bold mb-3">AMATEUR&nbsp;一曲入魂音樂嘉年華</h1>
        <div className="d-flex mb-8">
          <p className="fs-6 text-blue border border-blue rounded-pill mb-4 me-2 px-3 py-1"># 藝文活動</p>
          <p className="fs-6 text-blue border border-blue rounded-pill mb-4 px-3 py-1"># 音樂會</p>
        </div>
        <h2 className="fs-5 fw-bold mb-3">活動介紹：</h2>
        <p className="fs-5 text-justify mb-8">AMATEUR 音樂創作平台致力於打造適合音樂素人及樂團展現創作、演唱、傳承的舞台，一步步引領他們更接近夢想。日誌滿滿記載著藍星渾然天成的美景與歷史風光，蘊藏原始物種的惡地美景，穿梭巴宰海族蓬髮奔馳的古老意象，一曲入魂音樂嘉年華企圖營造出大型沉浸式感官體驗，視覺本體導入賽博龐克，表現後疫情末日世界的樣貌，熱愛音樂且一直默默創作歌曲的音樂創作者漂遊登陸，一同站上北流舞台，帶來一場絕對精采的音樂慶典，準備好成為漂遊者，透過音樂引導，尋找一線光明。</p>
        <div className="row mb-8">
          <section className="col-md-4">
            <h2 className="fs-5 fw-bold mb-3">活動資訊：</h2>
            <ul className="fs-5">
              <li className="mb-2">演出日期：2022-12-24 (六)</li>
              <li className="mb-2">入場時間：18:00（入場時間以現場公告為準）</li>
              <li className="mb-2">演出時間：19:00（預計演出時間）</li>
              <li className="mb-2">演出地點：臺北流行音樂中心</li>
              <li className="mb-2">演出地址：臺北市南港區市民大道八段99號</li>
              <li className="mb-2">售票時間：2022/11/11 (五) 上午11點</li>
              <li className="mb-2">購票方式：AMATEUR 獨家販售</li>
              <li>主辦單位：水星媒體股份有限公司</li>
            </ul>
          </section>
          <section className="col-md-7 offset-md-1">
            <iframe className="rounded-16" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14457.873006115733!2d121.5985944!3d25.0521137!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7df0dd098383b7f0!2z6Ie65YyX5rWB6KGM6Z-z5qiC5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1669822101853!5m2!1szh-TW!2stw" title="活動場館地圖" style={{ border: "0" }} width="100%" height="320" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </section>
        </div>
        <h2 className="fs-5 fw-bold mb-3">注意事項：</h2>
        <ol className="fs-5 text-justify mb-8">
          <li>請勿於拍賣網站或是其他非本網站正式授權售票之通路、網站購票，除可能衍生詐騙案件或交易糾紛外，以免影響自身權益，若發生演出現場無法入場或是其他問題，主辦單位及本網站概不負責。</li>
          <li>嚴禁私下有任何形式非供自用而加價轉售（無論加價名目為代購費、交通費、補貼等均包含在內）之情事，已違反社會秩序維護法第 64 條第 2 款，請勿以身試法。</li>
          <li>電子票券為無記名票券，請勿將票券 QR Code 任意公開或提供給第三人，以防遭人冒領入場。</li>
          <li>入場時請以行動裝置秀出會員中心 - 我的票券內的 QR Code；或直接列印 QR Code 作為入場票券掃描入場。</li>
          <li>請勿攜帶相機、攝影機、DV、錄音機入場，未經主辦單位同意，禁止拍照、錄影、錄音。</li>
          <li>本節目禁止攜帶外食、飲料、任何種類之金屬、玻璃、寶特瓶容器、雷射筆、煙火或任何危險物品。</li>
          <li>各表演場館各有其入場規定，請持票人遵守之，遲到觀眾需遵守館方管制。</li>
          <li>消費者必須以真實姓名購票及填寫有效個人資訊，一旦以虛假資料購買票券已經涉及「偽造私文書罪」，依照刑法第二百十條：「偽造、變造私文書，足以生損害於公眾或他人者，處五年以下有期徒刑。」 ，主辦單位及 AMATEUR 皆有權利立即取消該消費者訂單，請勿以身試法！</li>
          <li>購票前請詳閱注意事項，一旦購票成功視為同意上述所有活動注意事項。</li>
        </ol>
        <h2 className="fs-5 fw-bold mb-6">演出陣容：</h2>
        <ul className="d-flex mb-8">
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/珂拉琪-個人&頻道照片.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">珂拉琪</p>
                <p className="fs-8">蓮花空行身染愛</p>
                <p className="fs-8">萬千花蕊慈母悲哀</p>
                <p className="fs-8">葬予規路火烌猶在</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/等阮返來.jpeg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">等阮返來</p>
                <p className="fs-8">風颱天</p>
                <p className="fs-8">愛情攏是假</p>
                <p className="fs-8">雲海雲海</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/怕胖團.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">怕胖團</p>
                <p className="fs-8">月旁月光</p>
                <p className="fs-8">媽媽的筆記本</p>
                <p className="fs-8">時間的奴</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/PISCO.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">PISCO</p>
                <p className="fs-8">百花香</p>
                <p className="fs-8">BEING P!SCO</p>
                <p className="fs-8">旭日</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/麋先生.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">麋先生</p>
                <p className="fs-8">嗜愛動物</p>
                <p className="fs-8">在揮手那天回首</p>
                <p className="fs-8">Mr. ME</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/原子邦妮.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">原子邦妮</p>
                <p className="fs-8">成為你的所有</p>
                <p className="fs-8">難道只有我覺得</p>
                <p className="fs-8">想對你說</p>
              </div>
            </div>
          </li>
          <li className="flip ms-4">
            <div className="flip-inner">
              <div className="flip-front">
                <img className="rounded-circle" src="/images/告五人.jpg" alt="嘉賓照片" />
              </div>
              <div className="flip-back text-break p-6">
                <p className="fs-5 fw-bold mb-2">告五人</p>
                <p className="fs-8">好不容易</p>
                <p className="fs-8">披星戴月的想你</p>
                <p className="fs-8">愛人錯過</p>
              </div>
            </div>
          </li>
          <li class="ms-4" style={{ width: "12%" }}>
            <img class="flip-hidden rounded-circle" src="/images/user01.jpg" alt="嘉賓照片" />
          </li>
        </ul>
        <h2 className="fs-5 fw-bold mb-6">活動票券：</h2>
        <ul className="row mb-md-20">
          {this.state.ticketList.map((ticket, idx) =>
            <li className="col-md-3 btnClick" idx={ticket.TicketID}>
              <ul className="bg-secondary rounded-8 p-6">
                <li className="fs-4 fw-bold opacity-75 mb-2">{ticket.TicketSeat}</li>
                <li className="d-flex align-items-center fs-6 opacity-50 mb-2">
                  <span className="material-icons me-1">calendar_month</span>
                  時間：{ticket.TicketDate}
                </li>
                <li className="d-flex align-items-center fs-6 opacity-50 mb-2">
                  <span className="material-icons me-1">place</span>
                  地點：{ticket.TicketLocation}
                </li>
                <li className="d-flex align-items-center fs-6 opacity-50 mb-6">
                  <span className="material-icons me-1">confirmation_number</span>
                  票價：NT$ {ticket.TicketPrice}
                </li>
                <NavLink to={`/concert/${ticket.TicketID}`}>
                  <button className="btn btn-s btn-white w-100 fw-bold opacity-75" onClick={() => { this.addClass(ticket.TicketID) }}>
                    <span>下一步</span>
                  </button>
                </NavLink>
              </ul>
            </li>
          )}
        </ul>
      </section>
    );
  }
  addClass = (TicketID) => {
    let btnArr = document.querySelectorAll('.btnClick');
    for (let i = 0; i < btnArr.length; i++) {
      if (parseInt(btnArr[i].attributes.idx.value) === TicketID) {
        console.log('ok');
      } else {
        btnArr[i].classList.add('d-none');
      }
    }
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/TicketData`);
    this.setState({ ticketList: result.data });
  }
}

export default ConcertContent;