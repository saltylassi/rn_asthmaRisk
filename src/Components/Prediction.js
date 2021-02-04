import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    flex:1;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    
`;

const Title = styled.Text`
    font-size:10px;
    font-weight:500;
`;

const Description = styled.Text`
    font-size:10px;
    padding-top:20px;
    color:${props=>props.value>0?"#CC0000":"#0066FF"};
    opacity:0.7;
`;



const Prediction = ({date,temperature,index}) =>{

    return <Container>
        <Title>{`${new Date(date).getMonth()+1}월 ${new Date(date).getDate()}일`}</Title>
        <Description value={temperature}>{temperature}°C</Description>
    </Container>;
}

export default Prediction;