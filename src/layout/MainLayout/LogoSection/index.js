/*eslint-disable*/
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import nom from 'assets/images/nom.jpg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/* <Logo /> */}
        <img src={nom} alt="Berry" width="180" style={{backgroungColor:'white'}}/>
    </ButtonBase>
);

export default LogoSection;
