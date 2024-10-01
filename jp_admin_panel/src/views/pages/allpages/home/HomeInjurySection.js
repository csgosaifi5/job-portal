import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PagesService from 'src/services/PagesService'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Editor } from '@tinymce/tinymce-react'
import editorConfig from 'src/util/editorConfig'

const ValidateSchema = Yup.object({
  screen_content: Yup.object().shape(
    {
      title: Yup.string().required('Required'),
      subtitle: Yup.string().required('Required'),
      injuries: Yup.array().of(
        Yup.object().shape(
          {
            title: Yup.string().required('Required'),
            subtitle: Yup.string().required('Required'),
            count: Yup.string().required('Required'),
            image: Yup.string().required('Required'),
          },
          'Injuries in not valid',
        ),
      ),
    },
    'Injuries Section in not valid',
  ),
})

const HomeInjurySection = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      title: '',
      subtitle: '',
      injuries: [
        {
          title: '',
          subtitle: '',
          count: '',
          image: '',
        },
      ],
    },
  })

  const getSectionDetails = async () => {
    let response = await pagesService.getDetails(id)
    if (response.data) {
      setInitialValues(response.data)
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (id) {
      getSectionDetails()
    }
  }, [id])

  const onSubmit = async (values) => {
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      if (id) {
        formData.append('_id', id)
      }
      formData.append('screen_content', JSON.stringify(obj.screen_content))

      if (obj.screen_content && obj.screen_content.length > 0) {
        obj.screen_content.forEach((element, i) => {
          formData.append('image__' + i, element.image ? element.image : '')
        })
      }

      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/home/list')
        }, 1500)
      }
    } catch (error) {
      setSubmitLoader(false)
      toast.error(error.message)
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  })

  const addObject = () => {
    let obj = [...formik.values.screen_content.injuries]
    obj.push({
      title: '',
      subtitle: '',
      count: '',
      image: '',
    })
    formik.setValues({
      ...formik.values,
      screen_content: { ...formik.values.screen_content, injuries: obj },
    })
  }

  const removeObject = (index) => {
    const rows = [...formik.values.screen_content.injuries]
    rows.splice(index, 1)
    formik.setValues({
      ...formik.values,
      screen_content: { ...formik.values.screen_content, injuries: rows },
    })
  }
  return (
    <CCard style={{ margin: '0 auto 1.5rem' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">
          {id ? 'Edit Section' : 'Add Section'}{' '}
          <CBadge color="success">{formik.values.section_name}</CBadge>
        </p>
        <div>
          <CButton
            color="primary"
            type="submit"
            className="me-3"
            onClick={formik.handleSubmit}
            disabled={!(formik.isValid && formik.dirty) || submitLoader ? true : false}
          >
            Save
          </CButton>
          <CButton color="primary" variant="outline" onClick={() => navigate('/home/list')}>
            Back
          </CButton>
        </div>
      </CCardHeader>
      {!contentLoaded ? (
        <div className="d-flex justify-content-center py-3">
          <CSpinner color="dark" variant="grow" />
        </div>
      ) : (
        <CCardBody className={window.innerWidth < 576 ? 'px-0' : ''}>
          <CForm onSubmit={formik.handleSubmit}>
            <CContainer className="d-flex flex-column gap-3">
              <CCard className={'d-flex flex-column gap-3 p-3'}>
                <CBadge color="info" shape="rounded-pill" className="col-md-1 col-sm-4 py-2">
                  Edit Section
                </CBadge>
                <CRow>
                  <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                    <CFormLabel htmlFor="title">Title*</CFormLabel>
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_KEY}
                      value={formik.values.screen_content.title}
                      onEditorChange={(e) => {
                        formik.setFieldValue(`screen_content.title`, e)
                      }}
                      onBlur={formik.handleBlur}
                      init={editorConfig.singleLineEditor}
                    />
                  </CCol>
                  <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                    <CFormLabel htmlFor="subtitle">Sub-title*</CFormLabel>
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_KEY}
                      value={formik.values.screen_content.subtitle}
                      onEditorChange={(e) => {
                        formik.setFieldValue(`screen_content.subtitle`, e)
                      }}
                      onBlur={formik.handleBlur}
                      init={editorConfig.singleLineEditor}
                    />
                  </CCol>
                </CRow>
              </CCard>
              {formik.values.screen_content?.injuries.map((el, index) => (
                <CCard key={'item' + index} className={'d-flex flex-column gap-3 p-3'}>
                  <CBadge color="info" shape="rounded-pill" className="col-md-1 col-sm-4 py-2">
                    subtitle - {index + 1}
                  </CBadge>
                  <CRow>
                    <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
                      <CFormLabel htmlFor="title">Title*</CFormLabel>
                      <CFormInput
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={formik.values.screen_content.injuries[index]?.title}
                        name={`screen_content.injuries[${index}].title`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.screen_content &&
                          formik.touched.screen_content.injuries[index]?.title &&
                          formik.errors.screen_content &&
                          formik.errors.screen_content.injuries[index]?.title
                            ? ' border-danger'
                            : ''
                        }
                      />
                    </CCol>
                    <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                      <CFormLabel htmlFor="subtitle">Sub-title*</CFormLabel>
                      <CFormInput
                        type="text"
                        id="subtitle"
                        placeholder="sub-title"
                        value={formik.values.screen_content.injuries[index]?.subtitle}
                        name={`screen_content.injuries[${index}].subtitle`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.screen_content &&
                          formik.touched.screen_content.injuries[index]?.subtitle &&
                          formik.errors.screen_content &&
                          formik.errors.screen_content.injuries[index]?.subtitle
                            ? ' border-danger'
                            : ''
                        }
                      />
                    </CCol>
                    <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                      <CFormLabel htmlFor="count">Count*</CFormLabel>
                      <CFormInput
                        type="text"
                        id="count"
                        placeholder="Number of times"
                        value={formik.values.screen_content.injuries[index]?.count}
                        name={`screen_content.injuries[${index}].count`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.screen_content &&
                          formik.touched.screen_content.injuries[index]?.count &&
                          formik.errors.screen_content &&
                          formik.errors.screen_content.injuries[index]?.count
                            ? ' border-danger'
                            : ''
                        }
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormLabel htmlFor={`image${index}`}>
                        Image* <span className="text-info">(175 x 110)</span>
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id={`image${index}`}
                        placeholder="Image"
                        name={`screen_content.injuries[${index}].image`}
                        onChange={(e) => {
                          formik.setFieldValue(
                            `screen_content.injuries[${index}].image`,
                            e.currentTarget.files[0],
                          )
                        }}
                        className={
                          formik.touched.screen_content &&
                          formik.touched.screen_content.injuries[index]?.image &&
                          formik.errors.screen_content &&
                          formik.errors.screen_content.injuries[index]?.image
                            ? ' border-danger'
                            : ''
                        }
                      />
                      {formik.values.screen_content.injuries[index]?.image && (
                        <CRow>
                          <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-2' : 'col-6')}>
                            <CImage
                              rounded
                              thumbnail
                              src={
                                typeof formik.values.screen_content.injuries[index]?.image ==
                                'string'
                                  ? process.env.REACT_APP_API_BASEURL +
                                    formik.values.screen_content.injuries[index]?.image
                                  : URL.createObjectURL(
                                      formik.values.screen_content.injuries[index]?.image,
                                    )
                              }
                              width={200}
                              height={200}
                            />
                          </CCol>
                          <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-2' : 'col-4')}>
                            <CIcon
                              icon={cilTrash}
                              className="text-danger cursorPointer"
                              width={20}
                              height={20}
                              onClick={(e) => {
                                let text = 'Do you want to remove image ?'
                                if (window.confirm(text) === true) {
                                  let array = ''
                                  formik.setFieldValue(
                                    `screen_content.injuries[${index}].image`,
                                    array,
                                  )
                                }
                              }}
                            />
                          </CCol>
                        </CRow>
                      )}
                    </CCol>
                  </CRow>
                  <CCol className="d-flex justify-content-end">
                    <CButton
                      color="primary"
                      variant="outline"
                      onClick={() => removeObject(index)}
                      disabled={formik.values.screen_content.length < 4 ? true : false}
                    >
                      Remove
                    </CButton>
                  </CCol>
                </CCard>
              ))}
              <CRow>
                <CCol className="d-grid gap-2 col-1 pe-1">
                  <CButton color="success" onClick={addObject}>
                    Add
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="d-grid gap-2 col-4 mx-auto" style={{ margin: '1rem 0' }}>
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty) || submitLoader ? true : false}
                    >
                      {submitLoader ? (
                        <>
                          <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                          {'  '}Loading...
                        </>
                      ) : (
                        'Save'
                      )}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </CForm>
        </CCardBody>
      )}
      <ToastContainer />
    </CCard>
  )
}

export default HomeInjurySection
