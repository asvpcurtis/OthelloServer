import * as React from 'react';

interface SeekListItemProps {
    seeker: string;
    rating: number;
    onClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export const SeekListItem = (props: SeekListItemProps) => {
    return (
        <button key={props.seeker} onClick={props.onClick} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            {props.seeker}
            <span className="badge badge-primary badge-pill">{props.rating}</span>
        </button>
    )

}