import React, { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import GlobalContext from 'src/context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import AtsService from 'src/services/AtsServices'
import { Editor } from '@tinymce/tinymce-react'
import editorConfig from 'src/util/editorConfig'

const atsServ = new AtsService()
const AddService = () => {
  const globalCtx = useContext(GlobalContext)
  const [user, setUser] = globalCtx.user
  const { id } = useParams()
  const navigate = useNavigate()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    banner_title: '',
    banner_image: '',
    title: '',
    overview: '',
    description: '',
    tag: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    image: '',
  })

  const ValidateSchema = Yup.object({
    banner_title: Yup.string().required('Required'),
    banner_image: Yup.string().required('Required'),
    title: Yup.string().required('Required'),
    overview: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    meta_title: Yup.string().required('Required'),
    meta_description: Yup.string().required('Required'),
    meta_keywords: Yup.string().required('Required'),
    
    image: Yup.string().required('Required'),
  })

  const SelectOptions = []

  const getSectionDetails = async () => {
    let response = await atsServ.getService(id)
    if (response) {
      setInitialValues({...response})
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (id) {
      getSectionDetails()
    } else {
      setContentLoaded(true)
    }
  }, [id])

  const onSubmit = async (values) => {
    let response
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      formData.append('title', obj.title)
      formData.append('overview', obj.overview)
      formData.append('description', obj.description)
      formData.append('meta_title', obj.meta_title)
      formData.append('meta_description', obj.meta_description)
      formData.append('meta_keywords', obj.meta_keywords)
      formData.append('image', obj.image ? obj.image : '')
      formData.append('banner_title', obj.banner_title)
      formData.append('banner_image', obj.banner_image ? obj.banner_image : '')
      if (id) {
        formData.append('service_id', id)
        response = await atsServ.editService(formData)
      } else {
        response = await atsServ.addService(formData)
      }
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/services/list-all')
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
      <CCardHeader
        className="d-flex flex-row justify-content-between"
        style={{ position: 'sticky', top: '114px', zIndex: 20, background: 'white' }}
      >
        <p className="fw-bolder fs-4 m-0">
          {id ? 'Edit Service' : 'Add New Service'}{' '}
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
          <CButton color="primary" variant="outline" onClick={() => navigate(-1)}>
            Back
          </CButton>
        </div>
      </CCardHeader>
      {!contentLoaded ? (
        <div className="d-flex justify-content-center py-3">
          <CSpinner color="dark" variant="grow" />
        </div>
      ) : (
        <CCardBody>
          <CForm onSubmit={formik.handleSubmit}>
            {/* <CContainer className="d-flex flex-column gap-3"> */}
            <CCard className={'d-flex flex-column gap-3 p-3'}>
              <CRow>
                <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
                  <CFormLabel htmlFor="banner_title">Banner Title*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="banner_title"
                    placeholder="Title"
                    value={formik.values.banner_title}
                    name={`banner_title`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.banner_title && formik.errors.banner_title
                        ? ' border-danger'
                        : '')
                    }
                  />
                </CCol>
                <CCol>
                  <CFormLabel htmlFor="banner_image">
                    Banner Image* <span className="text-info">(1916 x 997)</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    id={`banner_image`}
                    placeholder="Background Image"
                    name={`banner_image`}
                    onChange={(e) => {
                      formik.setFieldValue(`banner_image`, e.currentTarget.files[0])
                    }}
                    className={
                      '' +
                      (formik.touched.banner_image && formik.errors.banner_image
                        ? ' border-danger'
                        : '')
                    }
                  />
                  {formik.values.banner_image && (
                    <CRow>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                        <CImage
                          rounded
                          thumbnail
                          src={
                            typeof formik.values.banner_image == 'string'
                              ? process.env.REACT_APP_API_BASEURL + formik.values.banner_image
                              : URL.createObjectURL(formik.values.banner_image)
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
                              formik.setFieldValue(`banner_image`, array)
                            }
                          }}
                        />
                      </CCol>
                    </CRow>
                  )}
                </CCol>
                <CCol sm="12" md="12">
                  <CFormLabel htmlFor="title">Title*</CFormLabel>
        
                  <CFormInput
                    type="text"
                    id="title"
                    placeholder="Enter Title"
                    value={formik.values.title}
                    name={`title`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' + (formik.touched.title && formik.errors.title ? ' border-danger' : '')
                    }
                  />
                </CCol>


                <CCol sm="12" md="12" className='mt-2'>
                  <CFormLabel htmlFor="overview">Overview*</CFormLabel>
                  <Editor
                    apiKey={process.env.REACT_APP_NEXT_TINYMCE_KEY}
                    value={formik.values.overview}
                    onEditorChange={(e) => {
                      formik.setFieldValue(`overview`, e)
                    }}
                    onBlur={formik.handleBlur}
                    init={editorConfig.multiLineEditor}
                  />
    
                </CCol>
                <CCol sm="12" md="12" className='mt-2'>
                  <CFormLabel htmlFor="description">Description*</CFormLabel>
                  <Editor
                    apiKey={process.env.REACT_APP_NEXT_TINYMCE_KEY}
                    value={formik.values.description}
                    onEditorChange={(e) => {
                      formik.setFieldValue(`description`, e)
                    }}
                    onBlur={formik.handleBlur}
                    init={editorConfig.multiLineEditor}
                  />
    
                </CCol>
              </CRow>
              <CRow>
       
                <CCol sm="12" md="6">
                  <CFormLabel htmlFor="meta_title">Meta-Title*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="meta_title"
                    placeholder="Enter Meta-Title"
                    value={formik.values.meta_title}
                    name={`meta_title`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.meta_title && formik.errors.meta_title
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
                    value={formik.values.meta_description}
                    name={`meta_description`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.meta_description && formik.errors.meta_description
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
                    value={formik.values.meta_keywords}
                    name={`meta_keywords`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.meta_keywords && formik.errors.meta_keywords
                        ? ' border-danger'
                        : '')
                    }
                  />
                </CCol>

                <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                  <CFormLabel htmlFor="image">
                    Blog Image* <span className="text-info">(430 x 330)</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    id={`image`}
                    placeholder="Blog Image"
                    name={`image`}
                    onChange={(e) => {
                      formik.setFieldValue(`image`, e.currentTarget.files[0])
                    }}
                  />

                  {formik.values.image && (
                    <CRow>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                        <CImage
                          rounded
                          thumbnail
                          src={
                            typeof formik.values.image == 'string'
                              ? process.env.REACT_APP_API_BASEURL + formik.values.image
                              : URL.createObjectURL(formik.values.image)
                          }
                          width={200}
                          height={200}
                        />
                      </CCol>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-8' : 'col-4')}>
                        <CIcon
                          icon={cilTrash}
                          className="text-danger cursorPointer"
                          width={20}
                          height={20}
                          onClick={(e) => {
                            let text = 'Do you want to remove image ?'
                            if (window.confirm(text) === true) {
                              let array = ''
                              formik.setFieldValue(`image`, array)
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
                <div
                  className="d-grid gap-2 col-sm-8 col-md-4 mx-auto"
                  style={{ margin: '1rem 0' }}
                >
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
            {/* </CContainer> */}
          </CForm>
        </CCardBody>
      )}
      <ToastContainer />
    </CCard>
  )
}

export default AddService
