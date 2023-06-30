import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IconButton, Stack, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {getDeadlineDate} from '../../helpers';
import {ItemRdo} from '../../types/item.rdo';
import {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {updateItemAction} from '../../store/api-actions';

type ItemProps = {
  item: ItemRdo;
};

function Item({item}: ItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [isContentEditable, setContentEditable] = useState(false);

  const [titleValue, setTitleValue] = useState(item.title);
  const [titleHelperText, setTitleHelperText] = useState('');

  const [descriptionValue, setDescriptionValue] = useState(item.description);
  const [descriptionHelperText, setDescriptionHelperText] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleValue.length >= 5 && titleValue.length <= 30 && descriptionValue.length <= 230) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [descriptionValue.length, titleValue.length]);

  const handleDeleteButtonClick = () => {
    setContentEditable(false); // tmp
  };

  const handleSaveButtonClick = () => {
    if (isFormValid) {
      setContentEditable(false);
      dispatch(updateItemAction({
        id: item.id,
        updateItemDto: {
          title: titleValue,
          description: descriptionValue
        }
      }));
    }
  };

  const handleEditButtonClick = () => {
    setContentEditable(true);
  };

  const handleTitleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTitleValue(value);
    if (value.length === 0) {
      setTitleHelperText('Введите название');
    }
    if (value.length > 30) {
      setTitleHelperText('Максимальная длина 30 символов');
    }
    if (value.length >= 1 && value.length < 5) {
      setTitleHelperText('Минимальная длина 5 символов');
    }
    if (value.length >= 5 && value.length <= 30) {
      setTitleHelperText('');
    }
  };

  const handleDescriptionInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setDescriptionValue(value);
    if (value.length > 230) {
      setDescriptionHelperText('Максимальная длина 230 символов');
    } else {
      setDescriptionHelperText('');
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          backgroundColor: '#f0f7ff'
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack direction={'row'}>
          {
            isContentEditable
              ? (
                <TextField
                  defaultValue={item.title}
                  onChange={handleTitleInputChange}
                  error={titleHelperText !== ''}
                  helperText={titleHelperText}
                  size='small'
                />
              )
              : (
                <Typography>
                  {item.title}
                </Typography>
              )
          }
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'} spacing={1}>
          {
            item.deadline
              && (
                <Typography
                  sx={{
                    color: 'green',
                    fontSize: '10px'
                  }}
                >
                  {getDeadlineDate(item.deadline)}
                </Typography>
              )
          }
          {
            isContentEditable
              ? (
                <TextField
                  defaultValue={item.description}
                  onChange={handleDescriptionInputChange}
                  error={descriptionHelperText !== ''}
                  helperText={descriptionHelperText}
                  size='small'
                />
              )
              : (
                <Typography
                  sx={{
                    fontSize: '14px'
                  }}
                >
                  {item.description}
                </Typography>
              )
          }
          <Stack direction={'row'}>
            {
              isContentEditable
                ? (
                  <>
                    <IconButton onClick={handleDeleteButtonClick}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleSaveButtonClick}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )
                : (
                  <IconButton onClick={handleEditButtonClick}>
                    <EditIcon />
                  </IconButton>
                )
            }
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default Item;
