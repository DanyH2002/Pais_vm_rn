import Routes from "./src/routes";
import LoginView from "./src/view/LoginView";
import RegisterView from "./src/view/RegisterView";
import CountryCard from "./src/components/CountryCard";
import Dropdown from "./src/components/DropDown";
import CountryForms from "./src/view/CountryForms";
import Home from "./src/view/Home";
import CountryDetails from "./src/view/CountryDetails";

export default function App() {
  return (
    // <Routes />
    // <LoginView />
    // <RegisterView />
    // <CountryCard />
    // <Dropdown
    //   label="Continente"
    //   options={["Europa", "Asia", "América", "África", "Oceanía"]}
    //   onSelect={(value) => console.log("Seleccionado:", value)}
    // />
    // <CountryForms />
    <Home />
    // <CountryDetails
    //   country={{
    //     id: 1,
    //     name: "México",
    //     official_name: "Estados Unidos Mexicanos",
    //     president: "Andrés Manuel López Obrador",
    //     capital: "Ciudad de México",
    //     size: 1964375,
    //     population: 126000000,
    //     flag: "https://flagcdn.com/w320/mx.png",
    //     continent_id: 1,
    //     language_id: 1,
    //     currency_id: 1,
    //     user_id: 1,
    //     continent: { id: 1, name: "América" },
    //     language: { id: 1, name: "Español" },
    //     currency: { id: 1, name: "Peso mexicano" },
    //   }}
    // />

  );
}
