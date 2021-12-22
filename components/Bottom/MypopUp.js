import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const MypopUp = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            // visible={this.state.modalVisible}
            onRequestClose={() => {
                // this.closeButtonFunction()
            }}>
            <View
                style={{
                height: '50%',
                marginTop: 'auto',
                backgroundColor:'blue'
                }}>
                <View>
                <Text>This is Half Modal</Text>
                </View>
                <TouchableOpacity
                
                onPress={() => {
                    
                }}>
                <Text >Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default MypopUp
