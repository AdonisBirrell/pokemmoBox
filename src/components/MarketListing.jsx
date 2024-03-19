import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Col, ListGroup, Row, Spinner, Stack, Tab, Table } from 'react-bootstrap';
import { TbExternalLink, TbHeart } from "react-icons/tb";
import { useQuery } from 'react-query';
import { useMarket } from '../context/MarketContext';
import { prices } from '../utils/prices';
import { Button, Card, ListItem, Typography } from './Atoms';
import { Graph } from './Atoms/Graph';
import { useTranslations } from '../context/TranslationsContext';
import { slugify } from '../utils/slugify'
import { ItemImage } from './Items/ItemImage'
import { Td as SrTd, Tr as SrTr } from 'react-super-responsive-table'
import { isMobile } from 'react-device-detect'
import { getItemInfo } from '../utils/items';

export const MarketListing = () => {
    const { language } = useTranslations()
    const { t } = useTranslations()

    const { wishlist, allItems, toggleWishlist } = useMarket()
    const [selectedItem, setSelectedItem] = useState(0);

    const { isError, isSuccess, isLoading, data: listing, error } = useQuery(
        ["newestItems"],
        prices.getNewestItems,
        { staleTime: 180000 }
    )

    if (isLoading)
        return (
            <Card>
                <Spinner animation="border" variant="warning" />
            </Card>
        )

    if (isError)
        return <Card>{error}</Card>

    const Tr = isMobile ? SrTr : 'tr'
    const Td = isMobile ? SrTd : 'td'


    return (
        <Card>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey={listing[0].id}>
                <Row>
                    <Col className='order-md-2 mb-2 mb-md-0'>
                        {
                            language !== 'cn' && language !== 'tw'
                                ?
                                <Graph
                                    hideItemActions={true}
                                    name={listing[selectedItem][language + '_name']}
                                    id={listing[selectedItem].apiID}
                                />
                                :
                                <Graph
                                    hideItemActions={true}
                                    name={listing[selectedItem].name} //cn 
                                    id={listing[selectedItem].apiID}
                                />
                        }
                    </Col>
                    <Col md="auto" className='order-md-1'>
                        <ListGroup className='overflow-scroll mb-1' style={{ maxHeight: 393 }}>
                            {
                                listing.map((item, index) => {
                                    const itemAPI = allItems.find(({ i }) => i === parseInt(item.i))
                                    return (
                                        <Stack direction='horizontal'>
                                            <ListItem as="div" key={item.id} action eventKey={item.id} style={{ cursor: "pointer" }} onClick={() => setSelectedItem(index)}>
                                                <Stack direction='horizontal'>
                                                    <div style={{ maxWidth: 250, minWidth: 250 }}>


                                                        {
                                                            language !== 'cn' && language !== 'tw'
                                                                ?
                                                                ['en', 'fr', 'es'].includes(language)
                                                                    ?
                                                                    <Td component="th" scope="row" className="d-flex align-items-start border-0">
                                                                        <ItemImage className="me-1 col" category={getItemInfo(item.id).category} id={item.id} />
                                                                        &nbsp;
                                                                        <Typography as="p" className='col mb-0 ln-1 fs-6 fw-bold item-name'>{item[language + '_name']}</Typography>
                                                                    </Td>
                                                                    :
                                                                    <Td component="th" scope="row" className="d-flex align-items-start border-0">
                                                                        <ItemImage className="me-1 col" category={getItemInfo(item.id).category} id={item.id} />
                                                                        &nbsp;
                                                                        <Typography as="p" className='col mb-0 ln-1 fs-6 fw-bold item-name'>{item['en_name']}</Typography>
                                                                    </Td>
                                                                :
                                                                <Td component="th" scope="row" className="d-flex align-items-start border-0">
                                                                    <ItemImage className="me-1 col" category={getItemInfo(item.id).category} id={item.id} />
                                                                    &nbsp;
                                                                    <Typography as="p" className='col mb-0 ln-1 fs-6 fw-bold item-name'>{item.name}</Typography>
                                                                </Td>
                                                        }
                                                        {
                                                            item.p
                                                                ?
                                                                <Typography as="small" className='text-muted'>{t('price')}: {prices.format(item.p)}</Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className='d-flex ms-auto'>
                                                        <Button variant='link' size="sm" onClick={() => toggleWishlist(item.i)}>
                                                            <TbHeart size={20} color={wishlist.includes(item.i) ? 'var(--bs-danger)' : 'var(--bs-gray)'} fill={wishlist.includes(item.i) ? 'var(--bs-danger)' : 'var(--bs-gray)'} />
                                                        </Button>
                                                        {
                                                            itemAPI !== undefined ?
                                                                <Button variant='link' size="sm" as={Link} to={`/items/${itemAPI.slug}`}>
                                                                    <Typography as="span"><TbExternalLink color="var(--bs-text)" size={20} /></Typography>
                                                                </Button>
                                                                :
                                                                <Button variant='link' size="sm" as={Link} to={`/items/${slugify(item.en_name)}`}>
                                                                    <Typography as="span"><TbExternalLink color="var(--bs-text)" size={20} /></Typography>
                                                                </Button>
                                                        }


                                                    </div>
                                                </Stack>
                                            </ListItem>
                                        </Stack>
                                    )
                                })
                            }
                        </ListGroup>
                        <Button as={Link} to="/items" variant="warning" className='w-100 justify-content-center'>View All items</Button>
                    </Col>
                </Row>
            </Tab.Container>
        </Card>
    )
}
