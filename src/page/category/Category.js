import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, useAccordionButton } from 'react-bootstrap';

//components
import { DataTable, DataTableHead, DataTableFooter, DataTableBody } from '../../components/DataTable';
import DeleteCategory from './DeleteCategory';
import Alert from '../../components/Alert';
//Lib
import { ChangeState } from '../../lib/ChangeState';
//action
import { showPopup } from '../../redux/action/popup';
import { showAlert, hideAlert } from '../../redux/action/alert';
//constant
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
//logic
import { getCategoryGroup, categoryCreateApi, categorySubCreateApi } from '../../logic/category';
import { Head } from '../../logic/Head';
function Category() {
   Head.setTitle('Categories | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { category, alert } = useSelector((state) => state);
   const [state, setState] = useState({ main: '', sub: '' });
   useEffect((e) => {
      getCategoryGroup(dispatch, category.dataFetched);
   }, []);

   return (
      <div className='app-content'>
         <div className='row m-0 p-0'>
            <div className='col-12 col-md-7'>
               <DataTable>
                  <DataTableHead title='All Categories' sub='Total : 10' />

                  <DataTableBody>
                     <div className='d-flex flex-column'>
                        <Alert
                           state={alert.display[alertkey.C_CATEGORY_ALERT]}
                           close={(e) => {
                              hideAlert(dispatch, alertkey.C_CATEGORY_ALERT);
                           }}
                        />
                        <div>
                           <AddCategory
                              placeholder='Add New Category'
                              save={(e) => {
                                 if (state.main) {
                                    categoryCreateApi(state.main, dispatch, (msg, status) => {
                                       showAlert(dispatch, alertkey.C_CATEGORY_ALERT, {
                                          msg: msg,
                                          status: status,
                                       });

                                       setState(
                                          ChangeState(state, {
                                             main: '',
                                          })
                                       );
                                    });
                                 }
                              }}
                              value={state.main}
                              change={(e) => {
                                 setState(
                                    ChangeState(state, {
                                       main: e.target.value,
                                    })
                                 );
                              }}
                           />
                        </div>
                        {category.data.map((v, i) => {
                           return (
                              <MainCategory
                                 eKey={i}
                                 catName={v.name}
                                 del={(e) => {
                                    showPopup(dispatch, popupkey.D_CATEGORY);
                                 }}
                              >
                                 <>
                                    {v.subCategory.map((v, i) => {
                                       return (
                                          <SubCategory
                                             subName={v.name}
                                             del={(e) => {
                                                showPopup(dispatch, popupkey.D_CATEGORY);
                                             }}
                                          />
                                       );
                                    })}

                                    <AddCategory
                                       placeholder='Add New Sub Category'
                                       value={state.sub}
                                       change={(e) => {
                                          setState(
                                             ChangeState(state, {
                                                sub: e.target.value,
                                             })
                                          );
                                       }}
                                       save={(e) => {
                                          if (state.sub) {
                                             categorySubCreateApi(state.sub, v.cat_id, dispatch, (msg, status) => {
                                                console.log(msg);
                                                setState(
                                                   ChangeState(state, {
                                                      sub: '',
                                                   })
                                                );
                                             });
                                          }
                                       }}
                                    />
                                 </>
                              </MainCategory>
                           );
                        })}
                     </div>
                  </DataTableBody>
                  <DataTableFooter></DataTableFooter>
               </DataTable>
            </div>
         </div>

         {/*-------------------------------------[ POPUP COMPONENTS]------------------------------------*/}
         <DeleteCategory />
         {/*-------------------------------------[ END POPUP COMPONENTS]------------------------------------*/}
      </div>
   );
}

function CategoryList(props) {
   return <div className='category-list-item'>{props.children}</div>;
}

function CategoryListName(props) {
   const { name } = props;
   return <span>{name}</span>;
}
function CategoryListItemBtn(props) {
   const { ico, click } = props;
   return (
      <button className='btn' onClick={click}>
         <ion-icon name={ico}></ion-icon>
      </button>
   );
}

function CategoryExpandBtn(props) {
   const { eKey } = props;
   const [state, setState] = useState({ expand: false });
   const togleEve = useAccordionButton(eKey, () => setState(ChangeState(state, { expand: state.expand ? false : true })));
   return <CategoryListItemBtn ico={state.expand ? 'chevron-up' : 'chevron-down'} click={togleEve} />;
}
function InputText(props) {
   const { value, placeholder, change } = props;
   return <input type='text' value={value} onChange={change} placeholder={placeholder} className='form-control' />;
}

function MainCategory(props) {
   const { eKey, catName, children, save, del } = props;
   const defaultState = { edit: false };
   const [state, setState] = useState(defaultState);

   return (
      <Accordion className='d-flex flex-column'>
         <CategoryList>
            <CategoryExpandBtn ico='chevron-down' eKey={eKey} />
            {state.edit ? <InputText /> : <CategoryListName name={catName} />}
            <CategoryListItemBtn
               ico={state.edit ? 'close' : 'create-outline'}
               click={(e) => {
                  setState(ChangeState(state, { edit: state.edit ? false : true }));
               }}
            />
            <CategoryListItemBtn
               ico={state.edit ? 'checkmark' : 'trash-outline'}
               click={(e) => {
                  state.edit ? save() : del();
               }}
            />
         </CategoryList>
         <Accordion.Collapse eventKey={eKey} className='category-sub-list-item'>
            {children}
         </Accordion.Collapse>
      </Accordion>
   );
}

function SubCategory(props) {
   const { subName, save, del } = props;
   const defaultState = { edit: false };
   const [state, setState] = useState(defaultState);
   return (
      <CategoryList>
         {state.edit ? <InputText /> : <CategoryListName name={subName} />}

         <CategoryListItemBtn
            ico={state.edit ? 'close' : 'create-outline'}
            click={(e) => {
               setState(ChangeState(state, { edit: state.edit ? false : true }));
            }}
         />
         <CategoryListItemBtn
            ico={state.edit ? 'checkmark' : 'trash-outline'}
            click={(e) => {
               state.edit ? save() : del();
            }}
         />
      </CategoryList>
   );
}

function AddCategory(props) {
   const { placeholder, save, change, value } = props;
   return (
      <CategoryList>
         <InputText placeholder={placeholder} value={value} change={change} />
         <CategoryListItemBtn ico='add' click={save} />
      </CategoryList>
   );
}

MainCategory.defaultProps = {
   save: (e) => {
      console.log('save');
   },
   del: (e) => {
      console.log('del');
   },
};

SubCategory.defaultProps = {
   save: (e) => {
      console.log('save');
   },
   del: (e) => {
      console.log('del');
   },
};

CategoryListItemBtn.defaultProps = {
   click: (e) => {},
};

AddCategory.defaultProps = {
   save: (e) => {},
};
InputText.defaultProps = {
   change: (e) => {},
};
export default Category;
