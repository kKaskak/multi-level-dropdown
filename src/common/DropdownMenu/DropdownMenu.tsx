import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './DropdownMenu.module.scss';
import classNames from 'classnames';
import { ArrowDown } from '../../assets';

type Props = {
	options: DropdownOptions;
	defaultOption: string;
	onOpen?: () => void;
	onClose?: () => void;
};

const DropdownMenu = ({ options, defaultOption, onOpen, onClose }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const [level, setLevel] = useState<number>(0);
	const [items, setItems] = useState<DropdownOptions>(options);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = useCallback(() => {
		setOpen((prevIsOpen) => !prevIsOpen);
	}, []);

	const handleItemClick = useCallback((item: Item) => {
		if (item.level) {
			setLevel((prevLevel) => prevLevel + 1);
			setItems(item.level);
		} else {
			setSelectedItem((prevSelectedItem) => (prevSelectedItem === item ? null : item));
			toggleDropdown();
		}
	}, [toggleDropdown]);

	const onBackButtonClick = useCallback(() => {
		setSelectedItem(null);
		setLevel((prevLevel) => prevLevel - 1);
		setItems(options);
	}, [options]);

	useEffect(() => {
		if (!selectedItem && !defaultOption) {
			const defaultItem = items.find((item) => item.default);
			defaultItem && setSelectedItem(defaultItem);
		}
	}, [items, selectedItem, defaultOption]);

	useEffect(() => {
		isOpen ? onOpen?.() : onClose?.();
	}, [isOpen, onOpen, onClose]);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.dropdownContainer} ref={dropdownRef}>
			<div
				className={classNames(styles.dropdownHeader, { [styles.open]: isOpen })}
				onClick={toggleDropdown}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === 'Space') toggleDropdown();
				}}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
			>
				{selectedItem ? items.find((item) => item?.id === selectedItem?.id)?.label : defaultOption}
				<ArrowDown style={{ transform: `rotate(${isOpen ? '0deg' : '-90deg'})`, fill: '#fff' }} />
			</div>
			<div className={classNames(styles.dropdownBody, { [styles.open]: isOpen })} role='listbox'>
				{level > 0 && (
					<div className={styles.dropdownBackButton} onClick={onBackButtonClick}>
						<ArrowDown style={{ transform: 'rotate(-270deg)', marginLeft: '0.5rem', fill: '#fff' }} />
						Back
					</div>
				)}
				{items
					.filter((item) => !item.hidden)
					.map((item) => (
						<div
							className={classNames(styles.dropdownItem, { [styles.selected]: item.id === selectedItem?.id })}
							onClick={() => handleItemClick(item)}
							key={item.id}
							role='option'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === 'Space') handleItemClick(item);
							}}
							aria-selected={item.id === selectedItem?.id}
						>
							<div>
								<span className={classNames(styles.dropdownItemDot, { [styles.selected]: item.id === selectedItem?.id })}>
									•{' '}
								</span>
								{item.label}
							</div>
							{item.level && <ArrowDown style={{ transform: 'rotate(-90deg)', marginLeft: '0.5rem', fill: '#fff' }} />}
						</div>
					))}
			</div>
		</div>
	);
};

export default DropdownMenu;
