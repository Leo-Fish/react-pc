import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { http } from '@/utils/http'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const { Option } = Select

const Publish = () => {
  const form = useRef(null)
  const [params] = useSearchParams()
  const articleId = params.get('id')
  useEffect(() => {
    const loadDetail = async (articleId) => {
      const res = await http.get(`/mp/articles/${articleId}`)
      const data = res.data.data
      const cover = data.cover
      form.current.setFieldsValue({ ...data, type: cover.type })
      const coverList = cover.images.map((url) => ({ url: url }))
      setFileList(coverList)
      fileListRef.current = coverList
    }
    if (articleId) {
      loadDetail(articleId)
    }
  }, [articleId])

  const [imgCount, setImgCount] = useState(1)
  const [fileList, setFileList] = useState([])
  const fileListRef = useRef([])
  const changeCount = (e) => {
    setImgCount(e.target.value)
    if (e.target.value === 1) {
      const firstImg = fileListRef.current[0]
      setFileList([firstImg])
    } else if (e.target.value === 3) {
      setFileList(fileListRef.current)
    }
  }
  const onUploadChange = ({ file, fileList }) => {
    setFileList(fileList)
    fileListRef.current = fileList
  }

  const navigate = useNavigate()
  const onFinish = async (values) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.response.data.url)
      }
    }
    const res = await http.post('/mp/articles?draft=false', params)
    console.log(params)
    navigate('/article')
  }

  const { channelStore } = useStore()
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? 'update' : 'publish'} article</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'please input article title' }]}
          >
            <Input placeholder="please input article title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="channel"
            name="channel_id"
            rules={[{ required: true, message: 'please choose article channel' }]}
          >
            <Select placeholder="please choose article channel" style={{ width: 400 }}>
              {channelStore.channelList ? (
                channelStore.channelList.map((channel) => <Option value={channel.id}>{channel.name}</Option>)
              ) : (
                <div>Loading...</div>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeCount}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (<Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://geek.itheima.net/v1_0/upload"
              fileList={fileList}
              onChange={onUploadChange}
              maxCount={imgCount}
              multiple={imgCount > 1}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? 'update' : 'publish'} article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)
