import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslations } from '../context/TranslationsContext'
import { Button, Modal, Typography } from './Atoms'
import { DiscordButton, ForumButton, HelpTranslateButton } from './Atoms/Button'
import { LanguageSwitcher } from './LanguageSwitcher'



export const Footer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslations();

    const toggleModal = () => setIsOpen(prev => !prev);

    return (
        <>
            <Container><Typography className="text-muted mb-0">By ColesNightfill, Fiereu, SquickGianno</Typography></Container>
            <Container className="mt-auto border-top py-2">

                <Modal
                    show={isOpen}
                    onHide={toggleModal}
                    title="PokeMMO Hub Team"
                    footer={<><DiscordButton /> <ForumButton /></>}
                >

                    <Typography>
                        we are a team of passionate pokemmo players, just like you, who have come together to create pokemmo hub! we aim to provide useful features and information for your daily pokemmo needs.
                    </Typography>
                    <Typography>
                        Developers: squickGianno, Fiereu, ColesNightfill
                    </Typography>
                    <Typography>
                        {t('thanks to bunga for our logo.')} <a href="https://www.instagram.com/brianmaiello_design/" target="_blank">{t('check out all his projects.')}</a>
                    </Typography>
                </Modal>
                <div className='d-flex flex-wrap align-items-center justify-content-between' style={{ gap: '.5rem' }}>
                    <div className="d-flex flex-wrap" style={{ gap: '.5rem' }}>
                        <Button size="sm" variant="success" onClick={toggleModal}>Who we are</Button>
                        <DiscordButton />
                        <ForumButton />
                    </div>
                    <div className="d-flex flex-wrap" style={{ gap: '.5rem' }}>
                        <HelpTranslateButton />
                        <LanguageSwitcher />
                    </div>
                </div>

            </Container>
        </>
    )
}
