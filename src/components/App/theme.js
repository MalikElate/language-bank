import { createMuiTheme } from '@material-ui/core'; 


const theme = createMuiTheme({ 
    palette: { 
        primary: { 
            main: '#283f3b'
        }, 
        secondary: { 
            main: '#95BF74'
        }
    }, 
    typography: {
        fontFamily: ['arial','Nunito', 'sans-serif'].join(',')
    }
}) 

export default theme; 