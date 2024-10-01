import React, { useEffect, useState, useContext } from 'react'
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
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import GlobalContext from 'src/context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import TestimonialService from 'src/services/TestimonialService'
import util from 'src/util/util'
import { Editor } from '@tinymce/tinymce-react'
import editorConfig from 'src/util/editorConfig'

const TestimonialServ = new TestimonialService()
const AddTestimonial = () => {
  const globalCtx = useContext(GlobalContext)
  const [user, setUser] = globalCtx.user
  // console.log(user.user_name)
  const { id } = useParams()
  const navigate = useNavigate()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    title: '',
    client: '',
    description: '',
    video: '',
  })

  const ValidateSchema = Yup.object({
    title: Yup.string().required('Required'),
    client: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    video: Yup.string().required('Required'),
  })

  const getSectionDetails = async () => {
    let response = await TestimonialServ.getTestimonial(id)
    if (response.data) {
      setInitialValues(response.data)
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
      // console.log(obj)
      formData.append('user_id', user._id)
      formData.append('title', obj.title)
      formData.append('client', obj.client)
      formData.append('description', obj.description)

      let filecheck = obj.video.name
        ? util.checkFileExtention(obj.video.name)
        : util.checkFileExtention(obj.video)

      if (
        filecheck !== 'mp4' &&
        filecheck !== 'jpeg' &&
        filecheck !== 'jpg' &&
        filecheck !== 'png'
      ) {
        throw new Error('Only mp4, jpeg, jpg and png are accepted')
      }

      formData.append('video', obj.video ? obj.video : '')

      if (id) {
        formData.append('_id', id)
        response = await TestimonialServ.editTestimonial(formData)
      } else {
        response = await TestimonialServ.addTestimonial(formData)
      }
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/testimonials/list-all')
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

  const ext = util.checkFileExtention(formik.values.video.name || formik.values.video)

  return (
    <CCard style={{ margin: '0 auto 1.5rem' }}>
      <CCardHeader
        className="d-flex flex-row justify-content-between"
        style={{ position: 'sticky', top: '114px', zIndex: 20, background: 'white' }}
      >
        <p className="fw-bolder fs-4 m-0">
          {id ? 'Edit Testimonial' : 'Add New Testimonial'}{' '}
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
          <CButton
            color="primary"
            variant="outline"
            onClick={() => navigate('/testimonials/list-all')}
          >
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
                <CCol sm="12" md="6">
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
                <CCol sm="12" md="6">
                  <CFormLabel htmlFor="client">For Client*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="client"
                    placeholder="Enter Client Name"
                    value={formik.values.client}
                    name={`client`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.client && formik.errors.client ? ' border-danger' : '')
                    }
                  />
                </CCol>
                <CCol sm="12" md="12">
                  <CFormLabel htmlFor="description">Description*</CFormLabel>
                  <Editor
                    apiKey={process.env.REACT_APP_TINYMCE_KEY}
                    value={formik.values.description}
                    onEditorChange={(e) => {
                      formik.setFieldValue(`description`, e)
                    }}
                    onBlur={formik.handleBlur}
                    init={editorConfig.multiLineEditor}
                  />
                  {/* <CFormTextarea
                    type="text"
                    id="description"
                    placeholder="Enter Description"
                    rows={10}
                    value={formik.values.description}
                    name={`description`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.description && formik.errors.description
                        ? ' border-danger'
                        : '')
                    }
                  /> */}
                </CCol>
              </CRow>

              <CRow></CRow>

              <CRow>
                <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                  <CFormLabel htmlFor="video">
                    Upload Video/Image <span className="text-info">(430 x 330)</span>
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    id={`video`}
                    name={`video`}
                    onChange={(e) => {
                      formik.setFieldValue(`video`, e.currentTarget.files[0])
                    }}
                  />
                  {formik.values.video && (
                    <CRow>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                        {ext === 'mp4' &&
                          (formik.values.video?.name?.includes('.mp4') ||
                            (typeof formik.values.video === 'string' &&
                              formik.values.video?.includes('.mp4'))) && (
                            <video
                              width={130}
                              controls
                              src={
                                typeof formik.values.video == 'string'
                                  ? process.env.REACT_APP_API_BASEURL + formik.values.video
                                  : URL.createObjectURL(formik.values.video)
                              }
                            ></video>
                          )}
                        {ext !== 'mp4' &&
                          (formik.values.video?.name?.includes(`.${ext}`) ||
                            (typeof formik.values.video === 'string' &&
                              formik.values.video?.includes(`.${ext}`))) && (
                            <CImage
                              rounded
                              thumbnail
                              src={
                                typeof formik.values.video == 'string'
                                  ? process.env.REACT_APP_API_BASEURL + formik.values.video
                                  : URL.createObjectURL(formik.values.video)
                              }
                              width={200}
                            />
                          )}
                      </CCol>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-8' : 'col-4')}>
                        <CIcon
                          icon={cilTrash}
                          className="text-danger cursorPointer"
                          width={20}
                          height={20}
                          onClick={(e) => {
                            let text = 'Do you want to remove video/image ?'
                            if (window.confirm(text) === true) {
                              let array = ''
                              formik.setFieldValue(`video`, array)
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

export default AddTestimonial
