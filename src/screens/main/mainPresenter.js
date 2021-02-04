import React from 'react';
import styled from 'styled-components';
import Proptypes from "prop-types";
import Prediction from "../../Components/Prediction";
import lung from "../../assets/images/lungs.png";
import cold from "../../assets/images/mask.png";
import thermometer from "../../assets/images/thermometer.png";

const Container = styled.ScrollView`
    flex:1;
`;

const TitleContainer = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
    padding-top:100px;
    padding-bottom:20px;
`;

const Title = styled.Text`
    font-size:30px;
    font-weight:700;
    color:${props=>props.result>70?"red":props.result>40?"orange":"#00CC33"};

`;

const TimeContainer = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
    padding-bottom:15px;
`;

const TimeText = styled.Text`
    font-size:20px;
    opacity:0.6;
`;

const ContentContainer = styled.View`
    flex:1;
    padding-bottom:10px;
    flex-direction:row;
`;

const TextContainer = styled.View`
    flex:1;
    flex-direction:column;
    align-items:center;
    padding-bottom:50px;
`;

const Text = styled.Text`
    font-size:15px;
    font-weight:700;
`;

const PredictionText = styled.Text`
    font-size:20px;
    font-weight:700;
`;

const Description = styled.Text`
    padding-top:10px;
    font-size:15px;
    opacity:0.7;
    color:${props=>props.purpose==="temperature"?props.value>0?"#CC0000":"#0066FF":props.value>=2?"red":props.value>=1?"orange":"green"};
`;


const PredictionContainer = styled.View`
    flex:1;
    justify-content:space-around;
    flex-direction:row;
    align-items:center;
    padding-top:5px;
`;

const ButtonContainer = styled.View`
    width:100%;
    justify-content:flex-end;
    align-items:center;
    flex-direction:row;
    padding-right:10px;
    padding-bottom:20px;
    `;

const ChangeStateBtn = styled.TouchableOpacity`
    width:80px;
    height:40px;
    margin-right:10px;
    border-radius:6px;
    background-color:rgba(122,122,122,0.1);
    justify-content:center;
`;

const ButtonText = styled.Text`
  text-align:center;
`;

const Image = styled.Image`
  width:60px;
  height:60px;
  margin-bottom:10px;
  justify-content:center;
`;



const MainPresenter = ({
    asthmaOfBucheon,
    asthmaOfSeoul,
    coldOfSeoul,
    coldOfBucheon,
    resultArray,
    time,
    todayTempOfBucheon,
    todayTempOfSeoul,
    tomorrowTempOfSeoul,
    tomorrowTempOfBucheon,
    region,
    setRegion
}) =>{
    return <Container contentContainerStyle={{ justifyContent: 'center',alignItems:'center' }}>
    <TitleContainer>
      <Title result={region==="Seoul"?resultArray[0]:resultArray[1]}>
      {region==="Seoul"?
      resultArray[0]>70?"위험":resultArray[0]>40?"주의":"안전":
      resultArray[1]>70?"위험":resultArray[1]>40?"주의":"안전"}</Title>
    </TitleContainer>
    <TimeContainer>
      <TimeText>{`${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분 ${region==="Seoul"?"서울":"부천"} 기준`}</TimeText>
    </TimeContainer>
    <ButtonContainer>
      <ChangeStateBtn onPress={setRegion}>
        <ButtonText>
          지역 변경
        </ButtonText>
      </ChangeStateBtn>
    </ButtonContainer>
    <ContentContainer>
      <TextContainer>
        <Image source={thermometer}/>
        <Text>기온</Text>
        <Description value={region==="Seoul"?todayTempOfSeoul:todayTempOfBucheon} purpose={"temperature"}>{region==="Seoul"?todayTempOfSeoul:todayTempOfBucheon}°C</Description>
      </TextContainer>
      <TextContainer>
        <Image source={lung}/>
        <Text>천식 폐질환 지수</Text>
        <Description value={region==="Seoul"?asthmaOfSeoul:asthmaOfBucheon} purpose={"indicator"}>{region==="Seoul"?asthmaOfSeoul:asthmaOfBucheon}</Description>
      </TextContainer>
      <TextContainer>
        <Image source={cold}/>
        <Text>감기 가능 지수</Text>
        <Description value={region==="Seoul"?coldOfSeoul:coldOfBucheon} purpose={"indicator"}>{region==="Seoul"?coldOfSeoul:coldOfBucheon}</Description>
      </TextContainer>
    </ContentContainer>
    <TextContainer>
      <PredictionText>
        예상 기온
      </PredictionText>
    </TextContainer>
    <PredictionContainer>
      {region==="Seoul"
      ?tomorrowTempOfSeoul.map((item,index)=><Prediction key = {index} date={time.getTime()+(index+3)*86400000} temperature={item} index={index}/>)
      :tomorrowTempOfBucheon.map((item,index)=><Prediction key = {index} date={time.getTime()+(index+3)*86400000} temperature={item} index={index}/>)}
    </PredictionContainer>
  </Container>;

}


MainPresenter.propTypes = {
    
    asthmaOfBucheon: Proptypes.string.isRequired,
    asthmaOfSeoul: Proptypes.string.isRequired,
    coldOfSeoul: Proptypes.string.isRequired,
    coldOfBucheon: Proptypes.string.isRequired,
    resultArray: Proptypes.array.isRequired,
    time: Proptypes.object.isRequired,
    todayTempOfBucheon: Proptypes.string.isRequired,
    todayTempOfSeoul: Proptypes.string.isRequired,
    tomorrowTempOfSeoul: Proptypes.array.isRequired,
    tomorrowTempOfBucheon: Proptypes.array.isRequired,
    region: Proptypes.string.isRequired,
    setRegion: Proptypes.func.isRequired
  };

export default MainPresenter;