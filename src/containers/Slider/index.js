import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Modification du sens > pour mettre les slides dans l'ordre décroissant //
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Modification de la const pour éviter une erreur de keys non uniques //
  const nextCard = () => {
    setTimeout(() => {
      if (!byDateDesc || byDateDesc.length === 0) {
        return;
      }
      // Ajout de -1 //
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }, 5000);
  };

  useEffect(() => {
    nextCard();
  });

  // Ajout d'une constante pour le fonctionnement des boutons radio //
  const handleRadioChange = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Mettre la clé dans une div qui englobe tout //
        <div key={event.title} >
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Changement de la clé //
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // Changement de idx -> index //
                  checked={index === radioIdx}
                  // Ajouts pour le fonctionnement des boutons radio //
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;