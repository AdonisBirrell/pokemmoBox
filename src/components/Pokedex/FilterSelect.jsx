import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslations } from '../../context/TranslationsContext'

export const FilterSelect = ({ value, onChange, data = [{ key: "", label: "" }], placeholder, title }) => {
    const { t } = useTranslations()
    return (
        <Form.Group>
            {
                title
                    ? <Form.Text>
                        {t(title)}
                    </Form.Text>
                    : false
            }
            <Form.Select value={value} onChange={onChange}>
                <option value={false}>{t(placeholder)}</option>
                {
                    data.map(({ key, label }) => <option key={key} value={key}>{label}</option>
                    )
                }
            </Form.Select>
        </Form.Group>
    )
}
