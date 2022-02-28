import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, useAccordionButton } from 'react-bootstrap';

//components
import { DataTable, DataTableHead, DataTableFooter, DataTableBody } from '../../components/DataTable';
import DeleteCategory from './DeleteCategory';
import DeleteSubCategory from './DeleteSubCategory';
import Alert from '../../components/Alert';
import DisplayCommonError from '../../components/DisplayCommonError';
import AccessDenied from '../../components/AccessDenied';
//Lib
import { ChangeState } from '../../lib/ChangeState';
import { checkAccess } from '../../lib/CheckAccess';
//action
import { showPopup } from '../../redux/action/popup';
import { showAlert, hideAlert } from '../../redux/action/alert';
//constant
import { popupkey } from '../../constant/popupkey';
import { alertkey } from '../../constant/alertkey';
//logic
import { getCategoryGroup, categoryCreateApi, categorySubCreateApi, updateCategory, updateSubCategory } from '../../logic/category';
import { Head } from '../../logic/Head';
function Category() {
   Head.setTitle('Categories | Soft Magic Kalmunai');
   const dispatch = useDispatch();
   const { category, alert, appmodule } = useSelector((state) => state);
   const [state, setState] = useState({ main: '', sub: '', deleteCategoryPos: 0, deleteSubCategoryPos: 0, module: 16 });
   useEffect((e) => {
      getCategoryGroup(dispatch, category.dataFetched);
      checkAccess(
         dispatch,
         appmodule,
         state.module,
         'r',
         () => {},
         () => {
            showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
         }
      );
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
                                 checkAccess(
                                    dispatch,
                                    appmodule,
                                    state.module,
                                    'c',
                                    () => {
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
                                    },
                                    () => {
                                       showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
                                    }
                                 );
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
                                    checkAccess(
                                       dispatch,
                                       appmodule,
                                       state.module,
                                       'd',
                                       () => {
                                          setState(
                                             ChangeState(state, {
                                                deleteCategoryPos: i,
                                             })
                                          );
                                          showPopup(dispatch, popupkey.D_CATEGORY);
                                       },
                                       () => {
                                          showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
                                       }
                                    );
                                 }}
                                 save={(data, setState) => {
                                    checkAccess(
                                       dispatch,
                                       appmodule,
                                       state.module,
                                       'u',
                                       () => {
                                          updateCategory(dispatch, { name: data.catName, cat_id: v.cat_id }, (res) => {
                                             let status = 1;
                                             if (res.data.status) {
                                                status = 1;
                                                getCategoryGroup(dispatch, false);
                                                setState(ChangeState(data, { edit: false }));
                                             } else {
                                                status = 0;
                                             }
                                             showAlert(dispatch, alertkey.C_CATEGORY_ALERT, {
                                                msg: res.data.message,
                                                status: status,
                                             });
                                          });
                                       },
                                       () => {
                                          showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
                                       }
                                    );
                                 }}
                              >
                                 <>
                                    {v.subCategory.map((v, j) => {
                                       return (
                                          <SubCategory
                                             subName={v.name}
                                             del={(e, setState) => {
                                                checkAccess(dispatch, appmodule, state.module, 'd', () => {
                                                   setState(
                                                      ChangeState(state, {
                                                         deleteSubCategoryPos: j,
                                                         deleteCategoryPos: i,
                                                      })
                                                   );
                                                   showPopup(dispatch, popupkey.D_SUBCATEGORY);
                                                });
                                             }}
                                             save={(data, setState) => {
                                                checkAccess(
                                                   dispatch,
                                                   appmodule,
                                                   state.module,
                                                   'u',
                                                   () => {
                                                      updateSubCategory(dispatch, { name: data.subName, subcat_id: v.subcat_id }, (res) => {
                                                         let status = 1;
                                                         if (res.data.status) {
                                                            status = 1;
                                                            getCategoryGroup(dispatch, false);
                                                            setState(ChangeState(data, { edit: false }));
                                                         } else {
                                                            status = 0;
                                                         }
                                                         showAlert(dispatch, alertkey.C_CATEGORY_ALERT, {
                                                            msg: res.data.message,
                                                            status: status,
                                                         });
                                                      });
                                                   },
                                                   () => {
                                                      showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
                                                   }
                                                );
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
                                          checkAccess(
                                             dispatch,
                                             appmodule,
                                             state.module,
                                             'c',
                                             () => {
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
                                             },
                                             () => {
                                                showPopup(dispatch, popupkey.CATEGORY_ACCESS_DENIED);
                                             }
                                          );
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
         <DeleteCategory pos={state.deleteCategoryPos} />
         <DeleteSubCategory pos={state.deleteSubCategoryPos} mainPos={state.deleteCategoryPos} />
         <AccessDenied displayKey={popupkey.CATEGORY_ACCESS_DENIED} />

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
   const { value, placeholder, change, name } = props;
   return <input type='text' value={value} onChange={change} placeholder={placeholder} className='form-control' name={name} />;
}

function MainCategory(props) {
   const { eKey, catName, children, save, del, name } = props;
   const defaultState = { edit: false, catName: catName };
   const [state, setState] = useState(defaultState);

   return (
      <Accordion className='d-flex flex-column'>
         <CategoryList>
            <CategoryExpandBtn ico='chevron-down' eKey={eKey} />
            {state.edit ? (
               <InputText
                  name={name}
                  value={state.catName}
                  change={(e) => {
                     setState(ChangeState(state, { catName: e.target.value }));
                  }}
               />
            ) : (
               <CategoryListName name={catName} />
            )}
            <CategoryListItemBtn
               ico={state.edit ? 'close' : 'create-outline'}
               click={(e) => {
                  setState(ChangeState(state, { edit: state.edit ? false : true }));
               }}
            />
            <CategoryListItemBtn
               ico={state.edit ? 'checkmark' : 'trash-outline'}
               click={(e) => {
                  state.edit ? save(state, setState) : del(state, setState);
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
   const defaultState = { edit: false, subName: subName };
   const [state, setState] = useState(defaultState);
   return (
      <CategoryList>
         {state.edit ? (
            <InputText
               value={state.subName}
               change={(e) => {
                  setState(ChangeState(state, { subName: e.target.value }));
               }}
            />
         ) : (
            <CategoryListName name={subName} />
         )}

         <CategoryListItemBtn
            ico={state.edit ? 'close' : 'create-outline'}
            click={(e) => {
               setState(ChangeState(state, { edit: state.edit ? false : true }));
            }}
         />
         <CategoryListItemBtn
            ico={state.edit ? 'checkmark' : 'trash-outline'}
            click={(e) => {
               state.edit ? save(state, setState) : del(state, setState);
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
