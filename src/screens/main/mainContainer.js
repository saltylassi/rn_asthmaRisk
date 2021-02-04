import React from "react";
import MainPresenter from "./mainPresenter";
import axios from "axios";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import dotenv from "dotenv";

dotenv.config();

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default class extends React.Component {
    state = {
        asthmaOfBucheon: null,
        asthmaOfSeoul: null,
        coldOfSeoul: null,
        coldOfBucheon: null,
        resultArray: null,
        time: null,
        todayTempOfBucheon: null,
        todayTempOfSeoul: null,
        tomorrowTempOfSeoul: null,
        tomorrowTempOfBucheon: null,
        loading: true,
        region: "Bucheon",
        error: false,
    };

    setRegion = (event) => {
        const { region } = this.state;

        const id = event.currentTarget.id;

        if (region === "Bucheon") {
            this.setState({ region: "Seoul" });
        } else if (region === "Seoul") {
            this.setState({ region: "Bucheon" });
        }
    };

    componentDidMount = async () => {
        const { data: dataObj } = await axios(
            {
                method: "get",
                url: `${process.env.API}/api/get-data`,
            },
            {
                timeout: 5000,
            }
        );

        const { asthmaOfBucheon, asthmaOfSeoul, coldOfSeoul, coldOfBucheon, resultArray, time, todayTempOfBucheon, todayTempOfSeoul, tomorrowTempOfSeoul, tomorrowTempOfBucheon } = dataObj;

        let newTime = new Date(time);
        newTime = new Date(newTime.getTime() - 32400000);

        if (dataObj == undefined) {
            this.setState({
                error: true,
            });
        }

        this.setState({
            asthmaOfBucheon: asthmaOfBucheon,
            asthmaOfSeoul: asthmaOfSeoul,
            coldOfSeoul: coldOfSeoul,
            coldOfBucheon: coldOfBucheon,
            resultArray: resultArray,
            time: newTime,
            todayTempOfBucheon: todayTempOfBucheon,
            todayTempOfSeoul: todayTempOfSeoul,
            tomorrowTempOfSeoul: tomorrowTempOfSeoul,
            tomorrowTempOfBucheon: tomorrowTempOfBucheon,
            loading: false,
        });
    };

    render() {
        const {
            error,
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
            loading,
        } = this.state;

        console.log(error);

        return loading ? (
            <Container>
                <ActivityIndicator size="large" color="black" />
            </Container>
        ) : error ? (
            <Container>API error</Container>
        ) : (
            <MainPresenter
                asthmaOfBucheon={asthmaOfBucheon}
                asthmaOfSeoul={asthmaOfSeoul}
                coldOfSeoul={coldOfSeoul}
                coldOfBucheon={coldOfBucheon}
                resultArray={resultArray}
                time={time}
                todayTempOfBucheon={todayTempOfBucheon}
                todayTempOfSeoul={todayTempOfSeoul}
                tomorrowTempOfSeoul={tomorrowTempOfSeoul}
                tomorrowTempOfBucheon={tomorrowTempOfBucheon}
                region={region}
                setRegion={this.setRegion}
            />
        );
    }
}
