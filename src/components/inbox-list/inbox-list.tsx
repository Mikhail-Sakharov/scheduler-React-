import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchItemsAction} from '../../store/api-actions';
import {getItems} from '../../store/app-data/selectors';
import {IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {nanoid} from 'nanoid';
import {getDeadlineDate} from '../../helpers';

function InboxList(): JSX.Element {
  const dispatch = useAppDispatch();

  const items = useAppSelector(getItems);

  useEffect(() => {
    dispatch(fetchItemsAction());
  }, [dispatch]);

  return (
    <Stack direction={'column'} spacing={1}>
      {
        items.map((item) => (
          <Accordion key={nanoid()}>
            <AccordionSummary
              sx={{
                backgroundColor: '#f0f7ff'
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>
                {item.title}
              </Typography>
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
                <Typography
                  sx={{
                    fontSize: '14px'
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
              <IconButton>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <SaveIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Stack>
  );
}

export default InboxList;
