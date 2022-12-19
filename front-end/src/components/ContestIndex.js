import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink } from "react-router-dom";

import '../css/contest.css';
import '../css/contestIndex.css';
class ContestIndex extends React.Component {
    render() {
        return (
            <div className='pb-30'>
                <img src="http://localhost:9000/contest/contest-BG.png" alt="" />

                <div class="contestDivHeader">
                    <p class="contest_h1 h1">活動辦法</p>
                </div>
                <div className='container'>
                    <div>
                        <div class="contstBodyLeft">
                            <p class="contestPart1Title">活動宗旨：</p>
                            <div class="contestText">
                                <p>
                                    第八屆 發現新星選拔賽 舉辦至今邁向第八年時光,目的是提供一個可以盡情展現熱情,展現音樂,勇敢追夢的你一個舞台去發光發熱,
                                    不管是樂團或是素人歌手可以藉此活動分享音樂,作品及理念,甚至是獲得娛樂公司的專業培訓機會,
                                    本次選拔賽也提供豐厚獎金等你來拿,不想錯過這次的機會,趕快來報名2022第八屆 發現新星選拔賽吧！！
                                </p>
                            </div>
                            <p class="contestPart1Title">活動資訊：</p>
                            <div class="contestText">
                                <p>決賽日期：2022/12/10 (五) - 2022/12/11 (日)</p>
                                <p>入場時間：18:00（實際入場時間以現場公告為準）</p>
                                <p> 決賽時間：19:00（預計演出時間） </p>
                                <p> 決賽地點：臺北流行音樂中心 </p>
                                <p> 決賽地址：台北市南港區市民大道八段99號 </p>
                                <p> 售票時間：2022/11/11 (五) 上午11點 </p>
                                <p> 購票方式：網站名稱獨家販售 </p>
                                <p> 主辦單位：水星媒體股份有限公司 </p>
                            </div>
                            <p class="contestPart1Title">決賽獎金：</p>
                            <div class="contestText">
                                <p>第一名：獎金50,000 </p>
                                <p>第二名：獎金30,000</p>
                                <p> 第三名：獎金10,000 </p>
                                <p>決賽參加獎：入選決賽18名選手皆可獲得精美禮品組</p>
                            </div>
                        </div>
                        <div>
                            <div class="contstBodyRight">
                                <img src="http://localhost:9000/contest/contest-01.jpg" class="contestImg" alt="" />
                            </div>
                            <div class="contstBodyRight">
                                <img src="http://localhost:9000/contest/contest-02.jpg" class="contestImg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container floatclear'>
                    <div>
                    </div>
                    <div className='contestText contestNote'>
                        <p className='contestPart1Title'>注意事項：</p>
                        <p> 1.請勿於拍賣網站或是其他非本網站正式授權售票之通路、網站購票，除可能衍生詐騙案件或交易糾紛外，以免影響自身權益，若發生演出現場無法入場或是其他問題，主辦單位及本網站概不負責。 </p>
                        <p> 2.若有任何形式非供自用而加價轉售（無論加價名目為代購費、交通費、補貼等均包含在內）之情事者，已違反社會秩序維護法第64條第2款，請勿以身試法。 </p>
                        <p> 3.電子票券為無記名票券，請勿將票券QR Code任意公開或提供給第三人，以防遭人冒領入場。 </p>
                        <p> 4.入場時請以行動裝置秀出會員中心 - 我的票券內的QR Code；或直接列印QR Code 作為入場票券掃描入場。 </p>
                        <p> 5.請勿攜帶相機、攝影機、DV、錄音機入場，未經主辦單位同意，禁止拍照、錄影、錄音。 </p>
                        <p> 6.本節目禁止攜帶外食、飲料、任何種類之金屬、玻璃、寶特瓶容器、雷射筆、煙火或任何危險物品。 </p>
                        <p> 7.各表演場館各有其入場規定，請持票人遵守之，遲到觀眾需遵守館方管制。</p>
                        <p> 8.消費者必須以真實姓名購票及填寫有效個人資訊，一旦以虛假資料購買票券已經涉及「偽造私文書罪」
                            ，依照刑法第二百十條：「偽造、變造私文書，足以生損害於公眾或他人者，處五年以下有期徒刑。」，主辦單位及KKTIX皆有權利立即取消該消費者訂單，請勿以身試法！
                        </p>
                        <p> 9.購票前請詳閱注意事項，一旦購票成功視為同意上述所有活動注意事項。</p>
                    </div>
                </div>
                <div class="contestDivHeader">
                    <h1 class="contest_h1 mb-6">報名資訊</h1>
                </div>
                <div className='container'>
                    <div class="contstBodyLeftPart2">
                        <div class="contestPart2Title">｜參加資格｜</div>
                        <div class="contestPart2Text">年滿18歲，並具有在學學生身份之證明並無經紀約者 </div>
                        <div class="contestPart2Title contestPaddingTop">｜報名注意事項｜</div>
                        <div class="contestPart2Text">
                            一、請提供至少一張本人照，需正面清晰，勿使用與 食物或無關物品之合照，不符合將依賽事規定取消參賽資格。
                        </div>
                        <div class="contestPart2Text">
                            二、上傳照片不可超過1MB(勿提供沙龍照，勿冒用他人照片或提供不是照片)
                        </div>
                    </div>
                    <div class="contstBodyRightPart2">
                        <div class="contestPart2Title">｜權益與義務｜</div>
                        <div class="contestPart2Title">報名階段</div>
                        <div className='CP2N mx-auto'>
                            <div class="contestPart2Note contestPadding">1.參賽資格：法定年齡18歲以上，具在學學生身份，無經紀公司簽約，
                                不限性別，符合以上每一項資格者皆可報名。</div>
                            <div class="contestPart2Note contestPadding">2.報名截止日期：2022年12月31日(六)23:59前。</div>
                            <div class="contestPart2Note contestPadding">3.勿冒用他人資料，照片著作權需為參賽者本身所有，報名內容若有
                                填寫不實或參者賽如有涉及任何違反社會善良風俗或法令之行為，主動退賽。</div>
                        </div>
                    </div>
                </div>
                <div className='floatclear container mb-3 contestNote contestPart2Note contestIndexBtn'>
                    <NavLink to="/ContestSignUp" className={'btn btn-gradation-square btn-l px-8 me-8'}><span>我要報名</span></NavLink>
                </div>
                <div class="contestDivHeader">
                    <h1 class="contest_h1 mb-6">投票資訊</h1>
                </div>
                <div className='container'>
                    <div className='floatclear container mb-3 contestNote contestPart2Note contestIndexBtn'>
                        <div className='contestPart1Title'>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div>
                        <div class="contstBodyLeft">
                            <p class="contestPart1Title"> 
                                最關鍵的網路票選階段，不只比外型、個人特色，更要你的人氣！
                                只要名次越前面，曝光機會就更多！
                                票選人氣前六名享有直接保送決賽的機會喔！
                            </p>
                        </div>
                        <div>
                            <div class="contstBodyRight">
                                <img src="http://localhost:9000/contest/contest-03.jpg" class="contestImg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='floatclear container mb-3 contestNote contestPart2Note contestIndexBtn'>
                    <NavLink to="/ContestVote" className={'btn btn-gradation-square btn-l px-8'}><span>前往投票</span></NavLink>
                </div>

            </div>
        );
    }
}

export default ContestIndex;