import { createMuiTheme } from '@material-ui/core'; 
import { deepPurple, amber } from '@material-ui/core/colors'; 


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
        fontFamily: ['Nunito', 'sans-serif'].join(',')
    }
}) 

export default theme; 