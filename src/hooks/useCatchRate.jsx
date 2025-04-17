import { useEffect, useState } from 'react'
import catchRates from '../data/catchRates.json'

export const BALLS = [
    {
        name: 'pokeball',
        rate: 1,
        status: true,
        health: true
    },
    {
        name: 'megaball',
        rate: 1.5,
        status: true,
        health: true
    },
    {
        name: 'ultraball',
        rate: 2,
        status: true,
        health: true
    },
    {
        name: 'bisball',
        rate: 2.5,
        status: true,
        health: true
    },
    {
        name: 'veloxball',
        rate: 5,
        status: true,
        health: false
    }
]

export const BALLS_CATCHRATE = [
    {
        name: 'Poke Ball',
        rate: 1,
        status: true,
        health: true
    },
    {
        name: 'Great Ball',
        rate: 1.5,
        status: true,
        health: true
    },
    {
        name: 'Ultra Ball',
        rate: 2,
        status: true,
        health: true
    },
    {
        name: 'Heal Ball',
        rate: 1.25,
        status: true,
        health: true
    },
    {
        name: 'Net Ball',
        rate: 3.5,
        status: true,
        health: true
    },
    {
        name: 'Nest Ball',
        rate: 4,
        status: true,
        health: true
    },
    {
        name: 'Dusk Ball',
        rate: 2.5,
        status: true,
        health: true
    },
    {
        name: 'Quick Ball',
        rate: 5,
        status: true,
        health: true
    },
    {
        name: 'Timer Ball',
        rate: 4,
        status: true,
        health: true
    },
    {
        name: 'Repeat Ball',
        rate: 2.5,
        status: true,
        health: true
    },
    {
        name: 'Luxury Ball',
        rate: 2,
        status: true,
        health: true
    },
    {
        name: 'Dream Ball',
        rate: 4,
        status: true,
        health: true
    },
]

export const STATUSES = [
    {
        name: null,
        rate: 1
    },
    {
        name: 'sleep',
        rate: 2
    }
]

export const STATUSES_CATCHRATE = [
    {
        name: null,
        rate: 1
    },
    {
        name: 'Sleep',
        rate: 2
    },
    {
        name: 'Freeze',
        rate: 2
    },
    {
        name: 'Paralysis',
        rate: 1.5
    },
]

export const calculateCatchRate = (pkmn_rate, max_hp, current_hp, pokeball, status) => {
    const x = (((max_hp * 3 - current_hp * 2) * 1 * pkmn_rate * pokeball.rate) / (max_hp * 3)) * status.rate
    if (x > 255) return { ball: pokeball.name, hp: current_hp, status: status.name, probabilities: 100 }; // Catch guaranteed
    const y = (65536 / (Math.sqrt(Math.sqrt(255 / x))))
    const z = (y / 65536) * (y / 65536) * (y / 65536) * (y / 65536) * 100
    return { ball: pokeball.name, hp: current_hp, status: status.name, probabilities: Math.round(z * 10) / 10 };
}

export const useCatchRate = (dex_id, max_hp) => {
    const [results, setResults] = useState([]);
    const rateObj = catchRates.find(({ id }) => id === dex_id)

    const pkmn_rate = typeof rateObj !== "undefined" ? rateObj.rate : 0

    useEffect(() => {
        BALLS.forEach(ball => {
            STATUSES.forEach(status => {
                if (!ball.status && status !== null) return;
                setResults(prev => [...prev, calculateCatchRate(pkmn_rate, max_hp, max_hp, ball, status)])
                if (!ball.health) return;
                setResults(prev => [...prev, calculateCatchRate(pkmn_rate, max_hp, 1, ball, status)])
            })
        });
    }, [max_hp, pkmn_rate])

    return results;
}