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
  CFormTextarea,
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
      banner_image: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      meta_title: Yup.string().required('Required'),
      meta_description: Yup.string().required('Required'),
      meta_keywords: Yup.string().required('Required'),
      image: Yup.string().required('Required'),
    },
    'Banner Section in not valid',
  ),
})

const ServiceMainPage = () => {
  const [type, setType] = useState('blogs')
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      title: '',
      banner_image: '',
      description: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      image: '',
    },
  })

  const getSectionDetails = async () => {
    let response = await pagesService.getDetails(type)
    if (response) {
      setInitialValues(response.content ? {screen_content:JSON.parse(response.content)}  : initialValues)
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (type) {
      getSectionDetails()
    }
  }, [type])

  const onSubmit = async (values) => {
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      if (type) {
        formData.append('type', type)
      }
      formData.append('screen_content', JSON.stringify(obj.screen_content))
      formData.append('image', obj.screen_content.image ? obj.screen_content.image : '')
      formData.append(
        'banner_image',
        obj.screen_content.banner_image ? obj.screen_content.banner_image : '',
      )

      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/services')
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
  return (
    <CCard style={{ margin: '0 auto 1.5rem' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">
          {type ? 'Edit Section' : 'Add Section'}{' '}
          <CBadge color="success">{formik.values.section_name}</CBadge>
        </p>
        <CButton
          color="primary"
          type="submit"
          className="me-3"
          onClick={formik.handleSubmit}
          disabled={!(formik.isValid && formik.dirty) || submitLoader ? true : false}
        >
          Save
        </CButton>
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
                  <CCol>
                    <CFormLabel htmlFor="title">Title*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="title"
                      placeholder="Title"
                      value={formik.values.screen_content.title}
                      name={`screen_content.title`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.title &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.title
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="banner_image">
                      Banner Image* <span className="text-info">(1920 x 1319)</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id={`banner_image`}
                      placeholder="Background Image"
                      name={`screen_content.banner_image`}
                      onChange={(e) => {
                        formik.setFieldValue(
                          `screen_content.banner_image`,
                          e.currentTarget.files[0],
                        )
                      }}
                      className={
                        '' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.banner_image &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.banner_image
                          ? ' border-danger'
                          : '')
                      }
                    />
                    {formik.values.screen_content.banner_image && (
                      <CRow>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              typeof formik.values.screen_content.banner_image == 'string'
                                ? process.env.REACT_APP_API_BASEURL +
                                  formik.values.screen_content.banner_image
                                : URL.createObjectURL(formik.values.screen_content.banner_image)
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
                                formik.setFieldValue(`screen_content.banner_image`, array)
                              }
                            }}
                          />
                        </CCol>
                      </CRow>
                    )}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="description">Description*</CFormLabel>
                    <Editor
                      apiKey={process.env.REACT_APP_NEXT_TINYMCE_KEY}
                      value={formik.values.screen_content.description}
                      onEditorChange={(e) => {
                        formik.setFieldValue(`screen_content.description`, e)
                      }}
                      onBlur={formik.handleBlur}
                      init={editorConfig.multiLineEditor}
                    />
                    {/* <CFormTextarea
                      type="text"
                      rows={8}
                      id="description"
                      placeholder="Enter Description"
                      value={formik.values.screen_content.description}
                      name={`screen_content.description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.description &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.description
                          ? ' border-danger'
                          : '')
                      }
                    /> */}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_title">Meta-Title*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_title"
                      placeholder="Enter Meta-Title"
                      value={formik.values.screen_content.meta_title}
                      name={`screen_content.meta_title`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_title &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_title
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_description">Meta-Description*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_description"
                      placeholder="Enter Meta-Description"
                      value={formik.values.screen_content.meta_description}
                      name={`screen_content.meta_description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_description &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_description
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_keywords">Meta-Keywords*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_keywords"
                      placeholder="Enter Meta-Keywords"
                      value={formik.values.screen_content.meta_keywords}
                      name={`screen_content.meta_keywords`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_keywords &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_keywords
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="image">
                      Background Image* <span className="text-info">(661 x 1141)</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id={`image`}
                      placeholder="Background Image"
                      name={`screen_content.image`}
                      onChange={(e) => {
                        formik.setFieldValue(`screen_content.image`, e.currentTarget.files[0])
                      }}
                      className={
                        '' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.image &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.image
                          ? ' border-danger'
                          : '')
                      }
                    />
                    {formik.values.screen_content.image && (
                      <CRow>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-2' : 'col-8')}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              typeof formik.values.screen_content.image == 'string'
                                ? process.env.REACT_APP_API_BASEURL +
                                  formik.values.screen_content.image
                                : URL.createObjectURL(formik.values.screen_content.image)
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
                                formik.setFieldValue(`screen_content.image`, array)
                              }
                            }}
                          />
                        </CCol>
                      </CRow>
                    )}
                  </CCol>
                </CRow>
              </CCard>
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

                      {/* Submit */}
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

export default ServiceMainPage
