import plant1 from "../assets/plants/plant_1.png";
import plant2 from "../assets/plants/plant_2.png";
import plant3 from "../assets/plants/plant_3.png";
import plant4 from "../assets/plants/plant_4.png";

export function drawCompanion(entity, form) {
  switch (entity) {
    case "plant":
      return plantDrawer(form);
    default:
      return null;
  }
}

export function plantDrawer(form) {
  switch (form) {
    case 1:
      return <img src={plant1} alt="Plant form 1" />;
    case 2:
      return <img src={plant2} alt="Plant form 2" />;
    case 3:
      return <img src={plant3} alt="Plant form 3" />;
    case 4:
      return <img src={plant4} alt="Plant form 4" />;
    default:
      return <img src={plant4} alt="Plant form 4" />;
  }
}