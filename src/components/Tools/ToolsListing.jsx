import { Link } from 'gatsby'
import React from 'react'
import { Image } from 'react-bootstrap'
import { SearchIcon, ArchetypeIcon, BerryIcon, CosmeticsIcon, EggIcon, EggMovesIcon, PokedexIcon, BreedingIcon } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { useDarkMode } from '../../context/DarkModeContext'
import './module.css'


const TOOLS = [
    {
        label: 'Cosmetics Helper',
        url: '/tools/cosmetics/',
        icon: CosmeticsIcon,
        description: 'Try on and wear any cosmetic on an in-game character.'
    },
    {
        label: 'Egg Moves Calculator',
        url: '/tools/egg-moves-calculator/',
        icon: EggIcon,
        description: 'Provides all pathways to achieve your desired eggmove. Prioritises the most efficient route.'
    },
    {
        label: 'Pokedex',
        url: '/tools/pokedex/',
        icon: PokedexIcon,
        description: 'View every pokemon\'s locations, catch rates, move lists, and stats.'
    },
    {
        label: 'Pokemon Search',
        url: '/tools/pokemon-search/',
        icon: SearchIcon,
        description: 'Search pokemon by ability and move combinations. For team-building or theory-crafting.'
    },
    {
        label: 'Breeding Simulator',
        url: '/tools/breeding/',
        icon: BreedingIcon,
        description: 'Displays a colour coded breeding tree of your desired pokemon, including IV\'s, nature, and price.'
    },
    {
        label: 'Berries Helper',
        url: '/tools/berries/',
        icon: BerryIcon,
        description: 'Manage your berries, showing you when to water and harvest. Features a droplet indicator.'
    },
    {
        label: 'Archetype Counter',
        url: '/tools/archetype-counter/',
        icon: ArchetypeIcon,
        description: 'Track your encounters while shiny hunting! Third party tool.'
    }
]



export const ToolsListing = () => {
    const { t } = useTranslations();

    const { isDark } = useDarkMode()

    return (
        <div className={`container ${isDark ? 'dark-mode' : ''}`}> {/* Apply dark mode class if true */}
            <div className="row g-2">
                {TOOLS.map(({ label, url, icon, description }) => (
                    <div className="col-12 col-sm-6 col-md-4" key={label}>
                        <Link to={url} className={`tool-card ${isDark ? 'dark-mode' : ''}`}>
                            <div className="tool-card-header">
                                <Image src={icon} className="tool-icon" />
                                <h5 className="tool-title">{t(label)}</h5>
                            </div>
                            <div className="tool-card-body">
                                <p>{t(description)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
