import React from 'react';
import { Space, Card } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const SpaceCards = () => {
  const items2 = [
    {
      name: 'Atbash',
      desc:
        'Атба́ш (ивр. ‏אתבש‏‎) — простой шифр подстановки для алфавитного письма. Правило шифрования состоит в замене i-й буквы алфавита буквой с номером n-i+1, где n — число букв в алфавите.',
    },
    {
      name: 'Scital',
      desc:
        'Скита́ла или сцита́ла (от греч. σκυτάλη «жезл») — инструмент, используемый для осуществления перестановочного шифрования, в криптографии известный также как шифр Древней Спарты. Представляет собой цилиндр и узкую полоску пергамента, на которой писалось сообщение, обматывавшуюся вокруг него по спирали.',
    },
    {
      name: 'Polybius',
      desc:
        'В криптографии квадрат Полибия (англ. Polybius square), также известный как шахматная доска Полибия — оригинальный код простой замены, одна из древнейших систем кодирования, предложенная Полибием',
    },
    {
      name: 'Cezar',
      desc:
        'Шифр Цезаря, также известный как шифр сдвига, код Цезаря или сдвиг Цезаря — один из самых простых и наиболее широко известных методов шифрования. Шифр Цезаря — это вид шифра подстановки, в котором каждый символ в открытом тексте заменяется символом, находящимся на некотором постоянном числе позиций левее или правее него в алфавите.',
    },
  ];
  const [hoverCard, setHoverCard] = React.useState(null);
  const OnHoverCard = (index) => {
    setHoverCard(index);
  };
  const OnLeaveCard = () => {
    setHoverCard(null);
  };
  return (
    <Space size={[50, 50]} wrap>
      {items2.map(({ name, desc }, index) => (
        <Link to={`/Shifr/${name}`}>
          <Card
            onMouseEnter={() => OnHoverCard(index)}
            onMouseLeave={() => OnLeaveCard()}
            className={classNames('MyCard', {})}>
            <div
              className={classNames('scene', {
                'is-flipped': hoverCard === index,
              })}>
              <div className={classNames('card__face card__face--front', {})}>{name}</div>
              <div className="card__face card__face--back">
                <p>{desc}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </Space>
  );
};

export default SpaceCards;
