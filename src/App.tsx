import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from './Loader'
import './App.css'
import Nodes from './Nodes'
import DarkMode from './DarkMode'
import { useState } from 'react';
import prepareNodes, { LevelsMap } from './utils/prepareNodes';

function Index() {
  const [nodes, setNodes] = useState<LevelsMap>()

  return (
    <div className="App">
      <DarkMode />
      <Formik
          initialValues={{ nodes: ''}}
          validationSchema={Yup.object({
              nodes: Yup.string().required('Required')
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
              const { nodes: _nodes } = values
              const _nodesArr = _nodes.split(',')
              if (_nodesArr.length > 7) {
                  setErrors({ nodes: 'Max 7 nodes' })
                  setSubmitting(false)
                  return
              }
              if (_nodesArr.length < 1) {
                  setErrors({ nodes: 'Min 1 node' })
                  setSubmitting(false)
                  return 
              }
              const preparedNodes = prepareNodes(_nodesArr)
              setNodes(preparedNodes)
              setSubmitting(false)
          }}
      >
          {({ isSubmitting, isValid }) => (

          <Form className="register-form">
            <div>
              <Field name="nodes" type="text" placeholder="Nodes"  disabled={isSubmitting}/>
              <button type="submit" disabled={isSubmitting || !isValid}>{isSubmitting ? <Loader /> : 'Run'}</button>
            </div>
              <ErrorMessage name="nodes"
                  render={(message: string) => <span className='error'>{message}</span>}
              />
          </Form>
          )}
      </Formik>
      <p className='instructions'>Provide a comma separated list of values, use the string <i>null</i> to indicate empty nodes e.g 1, 2, 3</p>

      <Nodes nodes={nodes as LevelsMap}/>
    </div>
  );
}

export default Index;



