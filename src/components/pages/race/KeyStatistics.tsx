import { ToCoinCurrency } from '@functions/CurrencyFunction'
import { styled } from 'styled-components'

const KeyStatistics = () => {
    return (
        <>
            <InfoContainer>
                <h1>Key Statistics</h1>
                <p>
                The most important data of this vault, use it to compare.
                </p>
            </InfoContainer>
            <Container>
                <Statistic>
                    <Title>#4</Title>
                    <Info>Race number</Info>
                </Statistic>
                <Statistic>
                    <Title>1,999</Title>
                    <Info>Players in the race</Info>
                </Statistic>
                <Statistic>
                    <Title>{ToCoinCurrency(1230000,1, true)} DRB</Title>
                    <Info>Amount of staked tokens</Info>
                </Statistic>
                <Statistic>
                    <Title>6.47%</Title>
                    <Info>APY of the vault</Info>
                </Statistic>
                <Statistic>
                    <Title>{ToCoinCurrency(6470, 1, true)} DRB</Title>
                    <Info>Total rewards</Info>
                </Statistic>
                <Statistic>
                    <Title>6 days</Title>
                    <Info>Time to rebalance</Info>
                </Statistic>
            </Container>
        </>
   )
}

const InfoContainer = styled.div``

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
`
const Statistic = styled.div`
    flex: 1 1 31%;
    padding: 1em;
    border: 1px solid ${({ theme }) => theme.style.colorBorder};
    border-radius: ${({ theme }) => theme.style.radius}px;
`
const Title = styled.h4`
    color: ${({theme}) => theme.style.colorPrimary};
`
const Info = styled.div`
    color: ${({theme}) => theme.style.colorLabel};
`
export default KeyStatistics