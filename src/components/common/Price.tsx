import { FC } from 'react';
import { isNaN, isNil } from 'lodash';
import styled from 'styled-components';

interface PriceProps {
    price?: string | number | null | typeof NaN;
    abbreviation?: string;
    currency?: string;
    className?: string;
    format?: boolean;
    screenReaderOnly?: boolean;
}

const StyledPrice = styled.span`
    align-items: center;
    color: inherit;
    display: inline-flex;
    gap: 0.25rem;

    .price {
        line-height: 1;
    }

    svg {
        display: block;
        fill: currentColor;
        flex-shrink: 0;
        height: 0.8em;
        margin-top: -0.1em;
        width: 0.8em;
    }
`;

const Price: FC<PriceProps> = ({
    price,
    abbreviation,
    currency = 'credits',
    className,
    format = false,
    screenReaderOnly = false,
}) => {
    const isUnknown = isNil(price) || isNaN(price);

    const formattedPrice = format
        ? currency.includes('bond')
            ? parseInt(price as string).toLocaleString('en', { maximumFractionDigits: 0 })
            : parseFloat(price as string).toLocaleString('en', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              })
        : price;

    return (
        <StyledPrice className={className}>
            {isNil(price) || (
                <span className="price">
                    <span aria-hidden="true">
                        {isUnknown ? 'Unknown' : isNil(abbreviation) ? formattedPrice : abbreviation}
                    </span>
                    <span className="visuallyhidden">
                        {isUnknown ? 'Unknown' : formattedPrice} {currency}
                    </span>
                </span>
            )}
            {screenReaderOnly || (
                <svg>
                    <use
                        xlinkHref={`/static/images/icons.svg#icon-${currency.includes('bond') ? 'bond' : 'credchip'}`}
                    />
                </svg>
            )}
        </StyledPrice>
    );
};

export default Price;
