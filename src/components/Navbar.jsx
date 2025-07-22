import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="w-full h-22 pt-5 pb-6 p-25">
        <div className="flex items-start">
          <img className="h-full cursor-pointer" src='/assets/lavendercare-logo.svg' onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  )
}

export default Navbar