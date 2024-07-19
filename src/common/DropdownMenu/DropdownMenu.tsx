import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './DropdownMenu.module.scss';
import classNames from 'classnames';

type Props = {
	options: DropdownOptions;
	defaultOption: string;
	disabled?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	onSelect?: (id: number) => void;
};

const DropdownMenu = ({ options, defaultOption, disabled, onOpen, onClose, onSelect }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const [items] = useState(options);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = useCallback(() => {
		setOpen((prevIsOpen) => !prevIsOpen);
	}, []);

	const handleItemClick = useCallback((id: number) => {
		if (typeof onSelect === 'function') {
			onSelect(id);
		}
		setSelectedItem((prevSelectedItem) => (prevSelectedItem === id ? null : id));
		toggleDropdown();
	}, [toggleDropdown, onSelect]);

	useEffect(() => {
		if (!selectedItem && !defaultOption) {
			const defaultItem = items.find((item) => item.default);
			if (defaultItem) {
				setSelectedItem(defaultItem.id);
			}
		}
	}, [items, selectedItem, defaultOption]);

	useEffect(() => {
		if (isOpen && typeof onOpen === 'function') {
			onOpen();
		}

		if (!isOpen && typeof onClose === 'function') {
			onClose();
		}
	}, [isOpen, onOpen, onClose]);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
				{selectedItem ? items.find((item) => item.id === selectedItem).label : defaultOption}
				{/* <ArrowDown style={{ transform: `rotate(${isOpen ? '0deg' : '-90deg'})` }} /> */}
			</div>
			<div className={classNames(styles.dropdownBody, { [styles.open]: isOpen })} role='listbox'>
				{items
					.filter((item) => !item.hidden)
					.map((item) => (
						<div
							className={classNames(styles.dropdownItem, { [styles.selected]: item.id === selectedItem })}
							onClick={() => handleItemClick(item.id)}
							key={item.id}
							role='option'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === 'Space') handleItemClick(item.id);
							}}
							aria-selected={item.id === selectedItem}
						>
							<span className={classNames(styles.dropdownItemDot, { [styles.selected]: item.id === selectedItem })}>• </span>
							{item.label}
						</div>
					))}
			</div>
		</div>
	);
};

export default DropdownMenu;