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
  CFormSelect,
  CFormTextarea,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { cilLockLocked, cilLockUnlocked, cilTouchApp, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import UserService from 'src/services/UserService'

const userServ = new UserService()
const AddMember = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    user_name: '',
    gender: '',
    bio: '',
    profile_image: '',
    password: '',
  })

  const ValidateSchema = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    user_name: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    bio: Yup.string(),
    profile_image: Yup.string(),
    password: id ? Yup.string().min(8).max(20) : Yup.string().required('Required').min(8).max(20),
  })

  const getSectionDetails = async () => {
    let response = await userServ.getUser(id)
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
      formData.append('first_name', obj.first_name)
      formData.append('last_name', obj.last_name)
      formData.append('email', obj.email)
      formData.append('user_name', obj.user_name)
      formData.append('gender', obj.gender)
      formData.append('bio', obj.bio)
      formData.append('password', obj.password)
      formData.append('role', '3')
      formData.append('profile_image', obj.profile_image ? obj.profile_image : '')
      if (id) {
        formData.append('_id', id)
        response = await userServ.editUser(formData)
      } else {
        response = await userServ.addUser(formData)
      }
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/members/list-all')
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
          {id ? 'Edit Member' : 'Add Member'}{' '}
          <CBadge color="success">{formik.values.section_name}</CBadge>
        </p>
        <CButton color="primary" variant="outline" onClick={() => navigate('/members/list-all')}>
          Back
        </CButton>
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
                  <CFormLabel htmlFor="first_name">First Name*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    value={formik.values.first_name}
                    name={`first_name`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.first_name && formik.errors.first_name
                        ? ' border-danger'
                        : '')
                    }
                  />

                  <CFormLabel htmlFor="user_name">Username*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="user_name"
                    placeholder="First Name"
                    value={formik.values.user_name}
                    name={`user_name`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.user_name && formik.errors.user_name ? ' border-danger' : '')
                    }
                  />
                  <CFormLabel htmlFor="email">Email Address*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="email"
                    placeholder="Email Address"
                    value={formik.values.email}
                    name={`email`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' + (formik.touched.email && formik.errors.email ? ' border-danger' : '')
                    }
                  />
                </CCol>
                <CCol sm="12" md="6">
                  <CFormLabel htmlFor="last_name">Last Name*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="last_name"
                    placeholder="Last Name"
                    value={formik.values.last_name}
                    name={`last_name`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.last_name && formik.errors.last_name ? ' border-danger' : '')
                    }
                  />
                  <CFormLabel htmlFor="bio">Bio</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="bio"
                    placeholder="Bio"
                    rows={4}
                    value={formik.values.bio}
                    name={`bio`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mb-2 textareaResizeNone"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                  <CRow>
                    <CCol>
                      <CFormLabel htmlFor="gender">Gender*</CFormLabel>
                      <CFormSelect
                        type="number"
                        id="gender"
                        placeholder="Gender"
                        value={formik.values.gender}
                        name={`gender`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          'mb-2' +
                          (formik.touched.gender && formik.errors.gender ? ' border-danger' : '')
                        }
                      >
                        <option value="">select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CFormLabel htmlFor="password">Password</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={showNewPassword ? cilLockUnlocked : cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={
                        formik.touched.password && formik.errors.password ? ' border-danger' : ''
                      }
                    />
                    <CInputGroupText>
                      <CIcon
                        icon={cilTouchApp}
                        className="text-warning cursorPointer"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      />
                    </CInputGroupText>
                  </CInputGroup>
                </CCol>
                <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                  <CFormLabel htmlFor="profile_image">Profile Image</CFormLabel>
                  <CFormInput
                    type="file"
                    id={`profile_image`}
                    placeholder="Profile Image"
                    name={`profile_image`}
                    onChange={(e) => {
                      formik.setFieldValue(`profile_image`, e.currentTarget.files[0])
                    }}
                  />

                  {formik.values.profile_image && (
                    <CRow>
                      <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                        <CImage
                          rounded
                          thumbnail
                          src={
                            typeof formik.values.profile_image == 'string'
                              ? formik.values.profile_image
                              : URL.createObjectURL(formik.values.profile_image)
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
                              formik.setFieldValue(`profile_image`, array)
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
                    ) : id ? (
                      'Update Member'
                    ) : (
                      'Create Member'
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

export default AddMember
