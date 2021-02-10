import React from 'react';
import { Space, Card } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const SpaceCards = () => {
  const items = ['Atbash', 'Scital', 'Polybe', 'Cezar'];
  const [hoverCard, setHoverCard] = React.useState(null);
  const OnHoverCard = (index) => {
    setHoverCard(index);
  };
  const OnLeaveCard = () => {
    setHoverCard(null);
  };
  return (
    <Space size={[50, 50]} wrap>
      {items.map((name, index) => (
        <Link to={`/Shifr/${name}`}>
          <Card
            onMouseEnter={() => OnHoverCard(index)}
            onMouseLeave={() => OnLeaveCard()}
            className={classNames('MyCard', {
              'is-flipped': hoverCard === index,
            })}>
            <div className={classNames('card__face card__face--front', {})}>{name}</div>
            <div className="card__face card__face--back">back</div>
          </Card>
        </Link>
      ))}
    </Space>
  );
};

export default SpaceCards;
