import { Link } from 'react-router-dom';
import RulesImg from "../assets/others//Rules.png"

function RulesScreen() {
  return (
    <div className='Rules'>
      <img className='Rules__Image' src={RulesImg}/>
      <Link className='Menu__Button' to="/">Back</Link>
    </div>
  );
}

export default RulesScreen;
