import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CheckboxFalse from '../../assets/icons/CheckboxFalse.svg';
import CheckboxTrue from '../../assets/icons/CheckboxTrue.svg';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Checkbox, ClickAwayListener, OutlinedInput } from '@mui/material';
import DropdownSVG from '../../assets/icons/filtering/DropdownIcon.svg';

const uncheckedIcon = <img src={CheckboxFalse} alt='Icon' />;
const checkedIcon = <img src={CheckboxTrue} alt='Icon' />;

function DropdownIcon() {
  return <img src={DropdownSVG} alt='Calendar' />;
}

const StyledAutocompletePopper = styled('div')(() => ({
  [`& .${autocompleteClasses.paper}`]: {
    margin: 0,
    color: '#000929',
    fontSize: 14,
    boxShadow: 0,
    overflow: 'hidden',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    width: 500,
    [`& .${autocompleteClasses.option}`]: {
      height: 40,
      alignItems: 'flex-start',
      '&[aria-selected="true"]': {
        backgroundColor: 'white',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: '#DEF2EA',
        },
    },
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  position: 'relative',
  width: 320,
  right: 0,
  '& input': {
    borderRadius: 4,
    backgroundColor: '#F1F3F4',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: 14,
  },
}));

export default function SelectWithSearch({
  iconSVG,
  placeholder,
  listOfItems,
  value,
  setValue,
}) {
  function Icon() {
    return <img src={iconSVG} alt='Icon' />;
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const setAndClose = () => {
    console.log('EMPTY');
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(' value!!! ', value);
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className='w-full'>
        <OutlinedInput
          startAdornment={<Icon />}
          endAdornment={<DropdownIcon />}
          placeholder={placeholder}
          onClick={handleOpen}
          sx={{ height: 38, width: '100%' }}
          value={value.map((val) => val.name)}
          readOnly
        />
        {open && (
          <div className=' p-1 absolute z-10 bg-white border-r-6 shadow-lg'>
            <Autocomplete
              open
              multiple
              fullWidth
              onClose={setAndClose}
              value={value}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  event.key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={StyledAutocompletePopper}
              noOptionsText='No labels'
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={uncheckedIcon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <Box>{option.name}</Box>
                </li>
              )}
              options={[...STATIONS_LIST].sort((a, b) => {
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + STATIONS_LIST.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + STATIONS_LIST.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder='Filter labels'
                />
              )}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

// From https://github.com/abdonrd/github-labels
const STATIONS_LIST = [
  {
    name: '(MRG - XTOL) Buick GMC ALM USA',
    id: '1',
  },
  {
    name: '(MRG - XTOL) Buick GMC ALM UK',
    id: '2',
  },
  {
    name: '(MRG - XTOL) Buick GMC ALM',
    id: '4',
  },
  {
    name: 'Buick GMC New',
    id: '14',
  },
  {
    name: '(MRG - XTOL) New',
    id: '5',
  },
  {
    name: 'Station 6',
    id: '6',
  },
  {
    name: 'Station 7',
    id: '17',
  },
  {
    name: 'Station 8',
    id: '18',
  },
  {
    name: 'Station 9',
    id: '9',
  },
  {
    name: 'Station 10',
    id: '10',
  },
];
