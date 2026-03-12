// Plantes
import plant1 from "../assets/plants/plant_1.png"; 
import plant2 from "../assets/plants/plant_2.png";
import plant3 from "../assets/plants/plant_3.png";
import plant4 from "../assets/plants/plant_4.png";

// Dodos
import dodo1 from "../assets/dodos/dodo_1.png";
import dodo2 from "../assets/dodos/dodo_2.png";
import dodo3 from "../assets/dodos/dodo_3.png";
import dodo4 from "../assets/dodos/dodo_4.png";

// Tangue
import tangue1 from "../assets/tangue/tangue_1.png";
import tangue2 from "../assets/tangue/tangue_2.png";
import tangue3 from "../assets/tangue/tangue_3.png";
import tangue4 from "../assets/tangue/tangue_4.png";

export function drawCompanion(entity, form) {
  switch (entity) {
    case "plant":
      return plantDrawer(form);
    case "dodo":
      return dodoDrawer(form);
    case "tangue":
      return tangueDrawer(form);
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

export function dodoDrawer(form) {
  switch (form) {
    case 1:
      return <img src={dodo1} alt="Dodo form 1" />;
    case 2:
      return <img src={dodo2} alt="Dodo form 2" />;
    case 3:
      return <img src={dodo3} alt="Dodo form 3" />;
    case 4:
      return <img src={dodo4} alt="Dodo form 4" />;
    default:
      return <img src={dodo4} alt="Dodo form 4" />;
  }
}

export function tangueDrawer(form) {
  switch (form) {
    case 1:
      return <img src={tangue1} alt="Tangue form 1" />;
    case 2:
      return <img src={tangue2} alt="Tangue form 2" />;
    case 3:
      return <img src={tangue3} alt="Tangue form 3" />;
    case 4:
      return <img src={tangue4} alt="Tangue form 4" />;
    default:
      return <img src={tangue4} alt="Tangue form 4" />;
  }
}