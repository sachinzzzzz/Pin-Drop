import '../styles/about.css'
import { Typography,styled } from '@mui/material';


function About(){

    const Test = styled(Typography)`
    height:100vh;
    `

    return (
        <Test className="about-sec">
            Hello World!
            <p>
                Developer: Sachin Munda.
            </p>
            <p>

                The Task demo.
            </p>

        </Test>
    )
}

export default About;