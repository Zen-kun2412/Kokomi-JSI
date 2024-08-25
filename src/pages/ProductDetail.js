import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/Layout.css'; // Import file CSS
import { Layout, Card, Input, Button, List, Typography } from 'antd';
import { LikeOutlined, HeartOutlined, MessageOutlined, DownloadOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti'; // Import confetti để tạo hiệu ứng pháo hoa

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const layoutStyle = {
  padding: '20px',
  backgroundColor: '#121212', /* Nền tối cho layout */
  color: '#e0e0e0', /* Màu chữ xám nhạt */
};

const contentStyle = {
  backgroundColor: '#1f1f1f', /* Nền tối cho content */
};

const siderStyle = {
  backgroundColor: '#333', /* Nền xám đậm cho sider */
  padding: '20px',
};

const ProductDetai = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [filmNewUpdate, setFilmNewUpdate] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0); // State để lưu chỉ số tập phim được chọn
  const [likeCount, setLikeCount] = useState(0); // State cho số lượng like
  const [likeColor, setLikeColor] = useState(''); // State cho màu của nút like
  const navigate = useNavigate();

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

  const navigateToDetail = (filmSlug, episodeSlug) => {
    navigate(`/film/${filmSlug}/${episodeSlug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const filmNewUpdate = await getData('phim-moi-cap-nhat');
      setFilmNewUpdate(filmNewUpdate.items || []);

      const byCategory = await getData('the-loai/hanh-dong?page=1');
      setByCategory(byCategory.items || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetch(`https://phim.nguonc.com/api/film/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data?.movie))
      .catch((error) => console.error('Error fetching product:', error));
  }, [slug]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleEpisodeClick = (index) => {
    setSelectedEpisodeIndex(index); // Cập nhật chỉ số tập phim khi nhấn
  };

  const handleLikeClick = () => {
    if (likeCount === 0) {
      setLikeCount(1);
      setLikeColor('blue');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <Layout style={layoutStyle} className="sider-container">
      <Layout>
        <Content style={contentStyle}>
          {product ? (
            <div className="product-detail">
              <iframe
                width='100%'
                height='500'
                src={product?.episodes.length > 0 ? product?.episodes[0]?.items[selectedEpisodeIndex]?.embed : '#'}
              ></iframe>
              <h3 className="product-title">
                {product?.episodes.length > 0 ? product?.episodes[0]?.items[selectedEpisodeIndex]?.slug : '#'}
              </h3>
              <div className="product-actions">
                <Button
                  icon={<LikeOutlined />}
                  onClick={handleLikeClick}
                  style={{ color: likeColor }}
                >
                  {likeCount > 0 && <span>{likeCount}</span>}
                </Button>
                <Button icon={<HeartOutlined />} />
                <Button icon={<MessageOutlined />} />
                <Button icon={<DownloadOutlined />} />
              </div>
              <h3 className="episode-title">Chọn tập phim</h3>
              <div className="episodes-list">
                {product.episodes && product.episodes.length > 0 ? (
                  product.episodes.map((episode, episodeIndex) => (
                    <div key={episodeIndex}>
                      <h3 className="episode-title">{episode.name}</h3>
                      {episode.items && episode.items.length > 0 ? (
                        episode.items.map((item, idx) => (
                          <Button
                            key={idx}
                            onClick={() => handleEpisodeClick(idx)}
                            style={{
                              backgroundColor: selectedEpisodeIndex === idx ? 'black' : 'initial',
                              color: selectedEpisodeIndex === idx ? 'white' : 'initial',
                            }}
                          >
                            {item.name}
                          </Button>
                        ))
                      ) : (
                        <p>Chưa có tập nào.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Đang tải thông tin...</p>
                )}
              </div>
              
              {/* Thông tin chi tiết sản phẩm */}
              <div className="product-info">
                <h3>Thông tin phim</h3>
                <p>Nội dung: {product.description}</p>
                <p>Ngày phát hành: {product.created}</p>
                <p>Thời gian: {product.time}</p>
                <p>Số tập: {product.current_episode}</p>
                <p>Đạo diễn: {product.director}</p>
                <p>Diễn viên: {product.casts}</p>
              </div>

              <div className="comments-section">
                <Title level={3}>Ý kiến khán giả</Title>
                <TextArea
                  rows={4}
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Nhập ý kiến của bạn..."
                />
                <Button type="primary" onClick={handleCommentSubmit} style={{ marginTop: '10px' }}>
                  Gửi ý kiến
                </Button>
                <List
                  dataSource={comments}
                  renderItem={(comment, index) => (
                    <List.Item key={index}>
                      <p>{comment}</p>
                    </List.Item>
                  )}
                  style={{ marginTop: '20px' }}
                />
              </div>
            </div>
          ) : (
            <p>Đang tải thông tin sản phẩm...</p>
          )}
        </Content>
        <Sider width="20%" style={siderStyle} className="sider-content">
          <div className="products-container">
            {byCategory.length > 0 ? (
              byCategory.map((item, index) => (
                <div className="card-wrapper" key={index}>
                  <Card
                    onClick={() => navigateToDetail(item.slug)}
                    hoverable
                    style={{
                      display: 'flex',
                      width: 300,
                      border: 'none',
                      marginBottom: '16px',
                    }}
                    bodyStyle={{ display: 'flex', padding: 0 }}
                  >
                    {/* 30% Hình ảnh */}
                    <div style={{ flex: '0 0 30%' }}>
                      <img
                        alt={item.name}
                        src={item.thumb_url}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    
                    {/* 70% Nội dung */}
                    <div style={{ flex: '0 0 70%', padding: '12px' }}>
                      <h3 className="Name">{item.name}</h3>
                      <p>Thời gian: {item.time}</p>
                      <p>Số tập: {item.total_episodes}</p>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p>Chưa có sản phẩm nào.</p>
            )}
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default ProductDetai;
