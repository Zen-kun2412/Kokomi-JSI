import { Card } from 'antd';
import React, { useState, useEffect } from "react";
import '../App.css';
import '../style/Home.css';
import styled from 'styled-components';
import ReactPlayer from 'react-player/vimeo';
import { VscMute, VscUnmute } from 'react-icons/vsc';
import logo from '../images/logoweb.png';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";



const { Meta } = Card;
const contentStyle = {
  width: '100%',
  height: '570px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Home = () => {
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  const [filmNewUpdate, setFilmNewUpdate] = useState();
  console.log("🚀 ~ Home ~ filmNewUpdate:", filmNewUpdate)
  const [byCategory, setByCategory] = useState();
  console.log("🚀 ~ Home ~ byCategory:", byCategory)

  const getData = async (param) => {
    const url = `https://phim.nguonc.com/api/films/${param}`;
    let data = [];
    try {
        const response = await fetch(url);
        const result = await response.json();
        data = result;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    return data;
};

const navigateToDetail = (slug) => {
    navigate(`/film/${slug}`); 
};

useEffect(() => {
    const fetchData = async () => {
        const filmNewUpdate = await getData('phim-moi-cap-nhat');
        setFilmNewUpdate(filmNewUpdate.items);

        const byCategory = await getData('the-loai/hanh-dong?page=1');
        setByCategory(byCategory.items);
    };

    fetchData();
}, []);

  return (
    <>
<div className='movie-slider'>
<IntroContainer>
        <ReactPlayer
          playing={true}
          width="100%"
          height="100%"
          volume={1}
          muted={isMuted}
          url="https://vimeo.com/273686020"
          className="videoIntro"
        />
        <div className="infoIntro">
          <h1 className="headingIntro">Kokomi The Rain</h1>
          <p className="overviewIntro">
            Trailer for Kokomi series "The Rain"

            Production: Fox Devil Films GmbH for Kokomi Amsterdam
            Director: Simon Ritzler
            Dop: Carlo Jelavic
            Editor: Michael Timmers
            Colorist: Mike Bothe
            Compositing: Stathis Nafpliotis
          </p>
        </div>
        {
          isMuted ? (
            <VscMute className="btnVolume"
              onClick={() => setIsMuted(prev => !prev)}
            />
          ) : (
            <VscUnmute className="btnVolume"
              onClick={() => setIsMuted(prev => !prev)}
            />
          )
        }
        <div className="fadeBottom"></div>
      </IntroContainer>
      <div>
      <h2 class="products-name">Phim mới cập nhật</h2>
      <div class="products-container">
        {
           filmNewUpdate?.map((item, index) => {
            return (
                <Card
                onClick={()=>navigateToDetail(item.slug)}
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img className='img' alt="example" src={item.thumb_url} />}
                >
                    <p className='writen'>{item.name}</p>
                </Card>
            )
        })
        }
      </div>
      
      <h2 class="products-name">Phim theo thể loại</h2>
      <div class="products-container">
        {
           byCategory?.map((item, index) => {
            return (
                <Card
                onClick={()=>navigateToDetail(item.slug)}
                    hoverable
                    style={{
                        width: 240,
                    }}
                    cover={<img className='img' alt="example" src={item.thumb_url} />}
                >
                    <p className='writen'>{item.name}</p>
                </Card>
            )
        })
        }
      </div>

      </div>
      <div>
      <div className="my-5">
  <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#45526e', width: '100%' }}>
    <div className="container p-4 pb-0" style={{ maxWidth: '100%', marginBottom:'-50px' }}>
      <section>
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <img  style={{ width: '180px', height: '120px', textAlign: 'center' }} src={logo} alt="" />
            <p>
              Đến với kokomi để trãi nghiệMnhiều bộ phim hay với độ phân giải từ full-4k, phim mượt mà không bị lag cũng như quản cáo. Hãy đến với kokomi
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Hỗ Trợ web</h6>
            <p>
              <a href="https://ant.design/" className="text-white">Ant Design</a>
            </p>
            <p>
              <a href="https://iconbuddy.com/search?q=wallet" className="text-white">Iconbuddy</a>
            </p>
            <p>
              <a href="https://chatgpt.com/" className="text-white">ChatGPT</a>
            </p>
            <p>
              <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Liên Kết</h6>
            <p>
              <a href="#!" className="text-white">Tài Khoản Của Bạn</a>
            </p>
            <p>
              <a href="#!" className="text-white">Đường Dẫn Hỗ Trợ</a>
            </p>
            <p>
              <a href="#!" className="text-white">Thông tin liên quan</a>
            </p>
            <p>
              <a href="#!" className="text-white">Trợ Giúp</a>
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><FontAwesomeIcon icon={faHome} className="mr-3" /> Luỹ Bán Bích</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> wunood@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} className="mr-3" /> + 08 272 053 86</p>
            <p><FontAwesomeIcon icon={faPrint} className="mr-3" /> + 08 272 053 86</p>
          </div>
        </div>
      </section>

      <hr className="my-3" />

      <section className="p-3 pt-0">
        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <div className="p-3">
              © 2024 :
              <a className="text-white" href="https://mdbootstrap.com/">KOKOMI.com</a>
            </div>
          </div>

          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
            <a href="https://www.facebook.com" className="btn btn-outline-light btn-floating m-1 text-white">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" className="btn btn-outline-light btn-floating m-1 text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.google.com" className="btn btn-outline-light btn-floating m-1 text-white">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.instagram.com" className="btn btn-outline-light btn-floating m-1 text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </section>
    </div>
  </footer>
</div>

</div>
</div>

    </>
  )
}



export default Home;

const IntroContainer = styled.div`
  background-color: var(--background-color);
  position: relative;
  color: var(--background-white);
  padding-top: 56%;

  .videoIntro {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .infoIntro {
    position: absolute;
    top: 140px;
    left: 30px;

    @media screen and (max-width: 800px) {
      top: 120px;
      left: 25px;
    }

    @media screen and (max-width: 600px) {
      top: 100px;
      left: 15px;
    }

    .headingIntro {
      font-size: 60px;
      color: white;
      transition: all 0.3s ease;

      @media screen and (max-width: 800px) {
        font-size: 40px;
      }
      @media screen and (max-width: 600px) {
        font-size: 24px;
      }
    }

    .overviewIntro {
      max-width: 550px;
      color: white;
      width: 100%;
      line-height: 1.3;
      padding-top: 25px;
      font-size: 18px;

      @media screen and (max-width: 800px) {
        font-size: 16px;
      }
      @media screen and (max-width: 600px) {
        font-size: 14px;
      }
    }
  }

  .btnVolume {
    position: absolute;
    height: 40px;
    width: 40px;
    right: 10%;
    top: 50%;
    cursor: pointer;
    border-radius: 50%;
    padding: 6px;
    color: #bbb;
    border: #fff solid 1px;
    transition: all 0.3s ease;
    transform: scale(1);
    &:hover {
      color: #fff;
      transform: scale(1.2);
      background-color: rgba(211, 211, 211, 0.18);
    }
    @media screen and (max-width: 800px) {
      height: 30px;
      width: 30px;
      padding: 4px;
    }
    @media screen and (max-width: 600px) {
      height: 20px;
      width: 20px;
      padding: 1px;
    }
  }

  .fadeBottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(15, 15, 15, 0.6) 40%,
      rgb(17, 17, 17),
      rgb(17, 17, 17)
    );
  }
`;