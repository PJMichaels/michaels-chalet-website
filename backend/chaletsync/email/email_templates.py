# email.templates.py

def new_request_admin_notification(request):
    subject = 'New Stay Request!'

    if '\n' in request.request_message:
        request_message = '\n    '.join(request.request_message.split('\n'))
    else:
        request_message = request.request_message

    message = 'Automated notification that a request has been submitted and requires attention.\n'
    message += 'Request Details:\n'
    message += f'  Request Type: {request.request_type}\n'
    message += f'  Created By: {request.created_by}\n'
    message += f'  Arrival Date: {request.arrival_date}\n'
    message += f'  Departure Date: {request.departure_date}\n'
    message += f'  Group Size: {request.group_size}\n'
    message += '  Message:\n'
    message += f'    {request_message}'

    return subject, message


# not used and may decide never to use. Less emails is better.
def new_request_confirmation(request):
    subject = 'Your stay request has been submitted!'
    message = f'''
        Thanks for submitting a stay request! We'll review this as soon as possible.
        
        The details of your stay are:
          Arrival Date: {request.arrival_date}
          Departure Date: {request.departure_date}
          Number of Guests: {request.group_size}
          Request Message: {request.request_message}

        Sincerely,
        Phil & Laura

        This email comes from an inbox that is not routinely checked, so feel free to reach out to us directly
        if you have any questions.
    '''
    return subject, message